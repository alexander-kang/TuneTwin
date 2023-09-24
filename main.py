import json
from flask import Flask, request, redirect, g, render_template
import requests
from urllib.parse import quote
from api_keys import CLIENT_ID, CLIENT_SECRET
from util.seatgeek import getSeatGeekData
import concurrent.futures
from pymongo.mongo_client import MongoClient
import certifi
from flask_cors import CORS  # Import Flask-CORS

# Authentication Steps, paramaters, and responses are defined at https://developer.spotify.com/web-api/authorization-guide/
# Visit this url to see all the steps, parameters, and expected response.
app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)
AUTHORIZATION_HEADER = {}

# Server-side Parameters
CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 8080
REDIRECT_URI = "{}:{}/callback/q".format(CLIENT_SIDE_URL, PORT)
SCOPE = "playlist-modify-public playlist-modify-private user-top-read"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

# MongoDB client
uri = "mongodb+srv://user-2:TyTQwfZWAcUi89Am@tunetwin.mwfk7r0.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
client = MongoClient(uri, tlsCAFile=certifi.where())
db = client['TuneTwin']
collection = db['Users']


auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": CLIENT_ID,
}


@app.route("/")
def index():
    global email
    email = request.args.get('email')
    # Auth Step 1: Authorization
    url_args = "&".join(["{}={}".format(key, quote(val))
                        for key, val in auth_query_parameters.items()])
    auth_url = "{}/?{}".format(SPOTIFY_AUTH_URL, url_args)
    return redirect(auth_url)


@app.route("/callback/q")
def callback():
    # Auth Step 4: Requests refresh and access tokens
    auth_token = request.args['code']
    code_payload = {
        "grant_type": "authorization_code",
        "code": str(auth_token),
        "redirect_uri": REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
    }
    post_request = requests.post(SPOTIFY_TOKEN_URL, data=code_payload)
    # print(post_request.json())

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    # Auth Step 6: Use the access token to access Spotify API

    authorization_header = {"Authorization": "Bearer {}".format(access_token)}

    user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
    profile_response = requests.get(
        user_profile_api_endpoint, headers=authorization_header)
    profile_data = json.loads(profile_response.text)
    global AUTHORIZATION_HEADER
    AUTHORIZATION_HEADER[email] = authorization_header
    print(AUTHORIZATION_HEADER)

    # return userID
    return redirect("http://localhost:3000/")


@app.route("/getYourArtists")
def getYourArtists():
    email = request.args.get('email')
    authorization_header = AUTHORIZATION_HEADER[email]
    res = getTopArtists(authorization_header)
    print(res)
    return res


def getTopArtists(auth_header):
    # Get user artist data
    user_top_artists_api_endpoint = "{}/me/top/artists".format(SPOTIFY_API_URL)
    top_artists_response = requests.get(
        user_top_artists_api_endpoint, headers=auth_header)

    top_artists_data = json.loads(top_artists_response.text)

    display_arr = [t['name'] for t in top_artists_data["items"]]
    num_threads = 4
    state = ["TX"]*len(display_arr)
    with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
        # Use the map function to apply the fetch_url function to each URL in parallel
        results = list(executor.map(getSeatGeekData, display_arr, state))

    return {"results": results}


def upsertUser(userId):
    if (collection.find_one({"username": userId}) == None):
        # Get profile data
        user_profile_api_endpoint = "{}/me".format(SPOTIFY_API_URL)
        profile_response = requests.get(
            user_profile_api_endpoint, headers=AUTHORIZATION_HEADER[userId])
        profile_data = json.loads(profile_response.text)

        record = {"_id": userId,
                  "name": profile_data['display_name'],
                  "friends": [],
                  "top_artists": getTopArtists(AUTHORIZATION_HEADER[userId])['results'],
                  "state": "TX"}

        collection.insert_one(record)


def addFriend(userId, friendId):
    friends = getFriendsFromDB(userId)
    collection.update_one(
        {"_id": userId}, {"$push": {"friends": friends.append(friendId)}})


class Event:
    def __init__(self, date, location, url, friends):
        self.date = date
        self.location = location
        self.url = url
        self.friends = friends


def getEventsWithFriends(userId):
    events = []
    state = getStateFromDB(userId)
    for k, v in getOverlappingArtists(userId).items():
        event = getSeatGeekData(k, state)
        address = event['address'] + ', ' + \
            event['city'] + ', ' + event['state']
        events.append(Event(event['date'], address, event['url'], v))
    return json.loads(events)


def getOverlappingArtists(userId):
    # get friends
    friends = getFriendsFromDB(userId)
    # get artists
    ta_set = set(getTopArtistsFromDB(userId))
    artists = {}
    # for every friend
    for f in friends:
        # find overlap, add to dictionary
        intersection = ta_set.intersection(set(getTopArtistsFromDB(f)))
        for artist in intersection:
            if artist in artists:
                artists[artist].append(f)
            else:
                artists[artist] = [f]
    # return dictionary
    return artists


def getFriendsFromDB(userId):
    return collection.find_one({"username": userId})['friends']


def getTopArtistsFromDB(userId):
    return collection.find_one({"username": userId})['top_artists']


def getStateFromDB(userId):
    return collection.find_one({"username": userId})['state']


if __name__ == "__main__":
    app.run(debug=True, port=PORT)
