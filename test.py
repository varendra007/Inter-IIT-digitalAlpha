import requests
from bs4 import BeautifulSoup

url = "https://www.sec.gov/Archives/edgar/data/789019/000119312515144132/d914667d8k.htm"
req = requests.get(url)
soup = BeautifulSoup(req.content, 'html.parser')
print(soup.prettify())