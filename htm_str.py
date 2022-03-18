import requests
def con(link):
    hdr = {'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Mobile Safari/537.36'}
    html = requests.get(link,headers=hdr)
    code = html.content
    return code
print(con("https://www.sec.gov/Archives/edgar/data/789019/000119312515247530/d54167d8k.htm"))