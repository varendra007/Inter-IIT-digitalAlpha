import urllib.request
def con(link):
    mystr = urllib.request.urlopen(link).read().decode("utf8")
    return mystr
print(con("https://www.sec.gov/ix?doc=/Archives/edgar/data/0001459417/000110465920055483/tm2018267d1_8k.htm"))