import re

stopwords = set()
STOPWORDS_FILE = 'stopwords.txt'

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
  word_list = create_word_list(text)
  filtered_list = filter_stopwords(word_list)
  return filtered_list

if __name__ == '__main__':
  print identify_keywords('the quick brown fox \r\njumps  \t over \na lazy dog')
