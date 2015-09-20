from clarifai.client import ClarifaiApi
import json
import itertools
def getTagsFromImages(images):
	clarifai_api = ClarifaiApi() # assumes environment variables are set.
	ans = []
	y = clarifai_api.tag_image_urls(images)
	a = [x["result"]["tag"]["classes"] for x in y["results"]]
	y = set()
	for i in a:
		for x in i:
			y.add(x)
	return list(y)