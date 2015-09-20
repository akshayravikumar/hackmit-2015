from flask import Flask, request
from processing.mainbrain import chooseSong
app = Flask(__name__)



from datetime import timedelta
from flask import make_response, request, current_app
from functools import update_wrapper


def crossdomain(origin=None, methods=None, headers=None,
                max_age=21600, attach_to_all=True,
                automatic_options=True):
    if methods is not None:
        methods = ', '.join(sorted(x.upper() for x in methods))
    if headers is not None and not isinstance(headers, basestring):
        headers = ', '.join(x.upper() for x in headers)
    if not isinstance(origin, basestring):
        origin = ', '.join(origin)
    if isinstance(max_age, timedelta):
        max_age = max_age.total_seconds()

    def get_methods():
        if methods is not None:
            return methods

        options_resp = current_app.make_default_options_response()
        return options_resp.headers['allow']

    def decorator(f):
        def wrapped_function(*args, **kwargs):
            if automatic_options and request.method == 'OPTIONS':
                resp = current_app.make_default_options_response()
            else:
                resp = make_response(f(*args, **kwargs))
            if not attach_to_all and request.method != 'OPTIONS':
                return resp

            h = resp.headers

            h['Access-Control-Allow-Origin'] = origin
            h['Access-Control-Allow-Methods'] = get_methods()
            h['Access-Control-Max-Age'] = str(max_age)
            if headers is not None:
                h['Access-Control-Allow-Headers'] = headers
            return resp

        f.provide_automatic_options = False
        return update_wrapper(wrapped_function, f)
    return decorator




def process_content(content):
  return chooseSong(content)

def process_images(images):
  return str(images)

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
  # songs = {"content": songs_txt, "images":songs_img}
  # songs = {"content": songs_txt}
  return str(songs_txt)

if __name__ == "__main__":
  app.run(debug=True)
