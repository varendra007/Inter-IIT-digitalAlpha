import urllib.request
def con(link):
    mystr = urllib.request.urlopen(link).read().decode("utf8")
    return mystr