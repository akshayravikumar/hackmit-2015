from clarifai.client import ClarifaiApi
import json
import itertools
def getTagsFromImages(images):
    clarifai_api = ClarifaiApi() # assumes environment variables are set.
    ans = []
    y = clarifai_api.tag_image_urls(images)
    ans = {}
    for x in y["results"]:
        for i in range(len(x["result"]["tag"]["classes"])):
            ans[x["result"]["tag"]["classes"][i]] = x["result"]["tag"]["probs"][i]/3
    return ans

print getTagsFromImages(["http://lifewallpaperz.com/images/2015/scenery/scenery-05.jpg", "http://lifewallpaperz.com/images/2015/scenery/scenery-05.jpg"])