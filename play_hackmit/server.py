from flask import Flask, request
from processing.identify_keywords import identify_keywords
app = Flask(__name__)

def process_content(content):
  x = identify_keywords(content)
  return x.keys()

def process_images(images):
  return images

@app.route("/")
def home():
  return "Hello World!" 

@app.route("/content/", methods = ["POST"])
@crossdomain(origin='*')
def process():
  print request.data
  songs = "Hi"
  if (request.form['content']):
    songs_txt = process_content(request.form['content'])
  if (request.form['images']):
    songs_img = process_images(request.form['images'])
  songs = {"content": songs_txt, "images":songs_img}
  return str(songs)

if __name__ == "__main__":
  app.run(debug=True)
