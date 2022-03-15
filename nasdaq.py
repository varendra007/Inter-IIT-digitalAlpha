import requests
import time
def market(ticker, start, end):
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+ticker+'&apikey=UPGJXRX8G99R3BG5'
    r = requests.get(url)
    data = r.json()
    ans = []
    for date in data["Weekly Time Series"]:
        temp_date = time.strptime(date, "%Y-%m-%d")
        if temp_date<=end and temp_date>=start:
            ans.append([date, float(data["Weekly Time Series"][date]["4. close"])])
    return ans

tick = input()
start = time.strptime(input('Start (yyyy-mm-dd):'), "%Y-%m-%d")
end = time.strptime(input('End (yyyy-mm-dd):'), "%Y-%m-%d")
print(market(tick, start, end))