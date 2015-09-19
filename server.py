from flask import Flask, request
app = Flask(__name__)

def process_content(content):
  return len(content)

@app.route("/")
def home():
  return "Hello World!" 

@app.route("/content/")
def process(): 
  songs = process_content(request.args.get('content'))
  return str(songs)

if __name__ == "__main__":
  app.run()
