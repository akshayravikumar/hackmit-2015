import identify_keywords as identify
import spotify_keyword as spotify
from clarifai.client import ClarifaiApi
import scraper
import indicoio
from os import environ
from lxml import html
import requests

def getTagsFromImages(images):
    clarifai_api = ClarifaiApi() # assumes environment variables are set.
    ans = []
    y = clarifai_api.tag_image_urls(images)
    a = [x["result"]["tag"]["classes"] for x in y["results"]]
    y = set()
    for i in a:
        for x in i:
            y.add(x)
    return list(y)

def chooseSong(text):
    keywords = identify.identify_keywords(text)
    wordlist = sorted(keywords.keys(), key = lambda x : keywords[x])
    wordlist = wordlist[:10]
    songs = spotify.full_process(wordlist)
    song = scraper.computeSong(songs, keywords)
    stuff = requests.get("http://api.musixmatch.com/ws/1.1/track.search?apikey=" + environ.get("MUSIX_API_KEY") + "&q_track=" + song[0] + "&q_artist=" + song[1])
    stuff = stuff.json()
    stuff = stuff["message"]["body"]["track_list"][0]["track"]["track_spotify_id"]
    return stuff
