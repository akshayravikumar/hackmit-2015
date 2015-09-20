from flask import Flask, request
from processing.identify_keywords import identify_keywords
app = Flask(__name__)

def process_content(content):
  x = identify_keywords(content)
  return x.keys()

@app.route("/")
def home():
  return "Hello World!" 

@app.route("/content/", methods = ["POST"])
def process():
  print request.data
  if (request.form['content']):
    songs = process_content(request.form['content'])
  else:
    songs = "Hi"
  return str(songs)

if __name__ == "__main__":
  app.run(debug=True)
