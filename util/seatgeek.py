from requests import *
#from geocoder import *

def getSeatGeekData(artist, state): # list of concert objects
    endpoint = f"https://api.seatgeek.com/2/events?q={artist}&client_id=MzY5MTMyNTF8MTY5NTQ4NDk2Mi41Nzc4NDg0&client_secret=%200d2e16e4b1b0ef50e72c28d3a81dbc0aa8c622d5bfcba638fc1f17cd861e2a0f"
    events = get(endpoint).json()["events"]
    concerts = []
    for event in events:
        concertObj = {}
        venue = event["venue"]
        concertObj["state"] = venue["state"]
        concertObj["url"] = venue["url"]
        concertObj["city"] = venue["city"]
        concertObj["address"] = venue["address"]
        concertObj["date"] = event["datetime_utc"].split("T")[0]
        if state == concertObj["state"]:
            concerts.append(concertObj)


    return {"concerts": concerts, "artist": artist}


# getSeatGeekData("beyonce", "TX")