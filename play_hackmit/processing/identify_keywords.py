import re
import indicoio

stopwords = set()
STOPWORDS_FILE = 'stopwords.txt'
NUM_RESULTS    = 10

GETTY = "Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate, we can not consecrate, we can not hallow this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion that we here highly resolve that these dead shall not have died in vain that this nation, under God, shall have a new birth of freedom and that government of the people, by the people, for the people, shall not perish from the earth."
PANGR = "The quick brown fox jumps over a lazy dog. Five boxing wizards jumped quickly."
SPEEC = "We had; I think we had a game of life. I think we'll have to do that to. It was pretty trickly. Hopefully you'll come out of it ok"
VOXDO = "The 67th Annual Emmy Awards are Sunday, September 20 at 8 p.m. Eastern on Fox. Brooklyn Nine-Nine star and former Saturday Night Live cast member Andy Samberg will be hosting (a.k.a. delivering a short monologue and quipping as quickly as possible between awards). As with any awards show, there is no shortage of pre-show coverage, whether that's backstage on the Emmys website starting at 6 p.m. Eastern, or E!'s Countdown to the Red Carpet starting at 4:30 p.m. Eastern. What to look out for at the 67th Annual Emmy Awards While technical and guest-actor awards were handed out last weekend at the Creative Arts Emmys, there are plenty of categories to get through on Sunday. One of the most notable aspects of the 2015 Emmy Awards is that this year marks the last time Mad Men is eligible. While the series has won Best Drama Series four times, none of its actors (including Jon Hamm) have ever won an Emmy. There is also the new addition of a Variety Sketch Series category. The separation from the existing Variety Series category allowed more scripted sketch shows like Inside Amy Schumer and Key and Peele to get nominated, where they were previously crowded out by late-night shows. In fact, the separate Variety Talk Series category this year is particularly stacked, thanks to Last Week Tonight with John Oliver and the final seasons of The Colbert Report and Late Show with David Letterman."

def filter_stopwords(word_list):
  global stopwords
  if len(stopwords) == 0:
    with open(STOPWORDS_FILE, 'r') as f:
      for word in f:
        stopwords.add(word.strip())

  return filter(lambda x: x not in stopwords, word_list)

def create_word_list(text):
  return re.split("\s+", text)

def identify_keywords(text):
  x = indicoio.keywords(text, threshold = 0.01, top_n = NUM_RESULTS)
  return x

if __name__ == '__main__':
  print identify_keywords(GETTY)
  print identify_keywords(PANGR)
  print identify_keywords(SPEEC)
  print identify_keywords(VOXDO)
