import identify_keywords as identify
import spotify_keyword as spotify
import scraper
import indicoio
from os import environ
from lxml import html
import requests

def chooseSong(text):
    keywords = identify.identify_keywords(text)
    wordlist = []
    for word in keywords:
        wordlist.append(word)
    for i in range(0, len(keywords)):
        for j in range(i + 1, len(keywords)):
            if (keywords[wordlist[i]] < keywords[wordlist[j]]):
                temp = wordlist[i]
                wordlist[i] = wordlist[j]
                wordlist[j] = temp
    wordlist = wordlist[:10]
    songs = spotify.full_process(wordlist)
    song = scraper.computeSong(songs, keywords)
    stuff = requests.get("http://api.musixmatch.com/ws/1.1/track.search?apikey=" + environ.get("MUSIX_API_KEY") + "&q_track=" + song[0] + "&q_artist=" + song[1])
    stuff = stuff.json()
    stuff = stuff["message"]["body"]["track_list"][0]["track"]["track_id"]
    return stuff
