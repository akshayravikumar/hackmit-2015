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
    print song[0] + " by " +  song[1]
    stuff = requests.get("http://api.musixmatch.com/ws/1.1/track.search?apikey=" + environ.get("MUSIX_API_KEY") + "&q_track=" + song[0] + "&q_artist=" + song[1])
    stuff = stuff.json()
    stuff = stuff["message"]["body"]["track_list"][0]["track"]["track_id"]
    return stuff

print chooseSong("Two days after asserting that President Barack Obama was a foreign-born Muslim, a guy who asked Donald Trump a provocative question at a New Hampshire rally is now the front-runner in the Republican race for President, according to a new poll. The poll, which was conducted by the University of Minnesota's Opinion Research Institute, shows Muslim Question Guy leading the G.O.P field with thirty-four per cent as opposed to nineteen percent for Trump.")
