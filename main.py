import json
from flask import Flask, request, redirect, g, render_template
import requests
from urllib.parse import quote
from api_keys import CLIENT_ID, CLIENT_SECRET
from util.seatgeek import getSeatGeekData
import concurrent.futures


# Authentication Steps, paramaters, and responses are defined at https://developer.spotify.com/web-api/authorization-guide/
# Visit this url to see all the steps, parameters, and expected response.
app = Flask(__name__)

# Spotify URLS
SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_BASE_URL = "https://api.spotify.com"
API_VERSION = "v1"
SPOTIFY_API_URL = "{}/{}".format(SPOTIFY_API_BASE_URL, API_VERSION)
AUTHORIZATION_HEADER = None

# Server-side Parameters
CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 8080
REDIRECT_URI = "{}:{}/callback/q".format(CLIENT_SIDE_URL, PORT)
SCOPE = "playlist-modify-public playlist-modify-private user-top-read"
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

auth_query_parameters = {
    "response_type": "code",
    "redirect_uri": REDIRECT_URI,
    "scope": SCOPE,
    # "state": STATE,
    # "show_dialog": SHOW_DIALOG_str,
    "client_id": CLIENT_ID
}


@app.route("/")
def index():
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

    # Auth Step 5: Tokens are Returned to Application
    response_data = json.loads(post_request.text)
    access_token = response_data["access_token"]
    refresh_token = response_data["refresh_token"]
    token_type = response_data["token_type"]
    expires_in = response_data["expires_in"]

    # Auth Step 6: Use the access token to access Spotify API
    global AUTHORIZATION_HEADER
    AUTHORIZATION_HEADER = {"Authorization": "Bearer {}".format(access_token)}
    return "success!"

@app.route("/getYourArtists")
def getYourArtists():

    # Get user artist data
    user_top_artists_api_endpoint = "{}/me/top/artists".format(SPOTIFY_API_URL)
    top_artists_response = requests.get(
        user_top_artists_api_endpoint, headers=AUTHORIZATION_HEADER)
    print(top_artists_response.text)
    top_artists_data = json.loads(top_artists_response.text)

    # Combine profile and playlist data to display
    # display_arr = [profile_data] + \
    #     playlist_data["items"] + top_artists_data["items"]
    display_arr = [t['name'] for t in top_artists_data["items"]]
    num_threads = 4
    state = ["TX"]*len(display_arr)
    with concurrent.futures.ThreadPoolExecutor(max_workers=num_threads) as executor:
        # Use the map function to apply the fetch_url function to each URL in parallel
        results = list(executor.map(getSeatGeekData, display_arr, state))

    return {"results": results}




if __name__ == "__main__":
    app.run(debug=True, port=PORT)
