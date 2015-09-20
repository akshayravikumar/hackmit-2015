import spotify_keyword as spotify
import identify_keywords as identify
import indicoio
from os import environ
from lxml import html
import requests

def keylyrics(name, artist):
    stuff = requests.get("http://api.musixmatch.com/ws/1.1/track.search?apikey=" + environ.get("MUSIX_API_KEY") + "&q_track=" + name + "&q_artist=" + artist)
    stuff = stuff.json()
    stuff = stuff["message"]["body"]["track_list"][0]["track"]["track_id"]
    print stuff
    page = requests.get("http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=" + environ.get("MUSIX_API_KEY") + "&track_id=" + str(stuff))
    tree = page.json()
    lyrics = tree["message"]["body"]["lyrics"]["lyrics_body"]
    return identify.identify_keywords(lyrics)

def computeSong(songs, keywords):
    maxval = 0
    for song in songs:
        num = 10*match(keylyrics(song[0], song[1]), keywords) + song[3]
        if (num > maxval):
            maxval = num
            final = song
    return final

def match(alist, blist):
    count = 0
    for k in alist:
        if (k in blist):
            count = count + 1
    return count