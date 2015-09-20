from flask import Flask, request
app = Flask(__name__)

def process_content(content):
  return len(content)

@app.route("/")
def home():
  return "Hello World!" 

@app.route("/content/")
def process():
  if (request.args.get('content')):
    songs = process_content(request.args.get('content'))
  else:
    songs = "Hello World!"
  return str(songs)

if __name__ == "__main__":
  app.run()
