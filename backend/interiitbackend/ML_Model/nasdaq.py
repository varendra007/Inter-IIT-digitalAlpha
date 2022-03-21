import requests
import time
def market(ticker, start, end):
    start = time.strptime(start, "%Y-%m-%d")
    end = time.strptime(end, "%Y-%m-%d")
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol='+ticker+'&apikey=UPGJXRX8G99R3BG5'
    r = requests.get(url)
    data = r.json()
    ans = []
    try:
        for date in data["Weekly Time Series"]:
            temp_date = time.strptime(date, "%Y-%m-%d")
            if temp_date<=end and temp_date>=start:
                ans.append([date, float(data["Weekly Time Series"][date]["4. close"])])
        return ans
    except:
        return []