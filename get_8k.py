import finnhub
import time
finnhub_client = finnhub.Client(api_key="c8o9j5qad3iddfsapu4g")
def get_fil(ticker, start, end):
    s = time.strptime(start, "%Y-%m-%d")
    e = time.strptime(end, "%Y-%m-%d")
    r = finnhub_client.filings(symbol=ticker, _from=start, to=end)
    k_8 = []
    dates = []
    for filings in r:
        if filings["form"]=="8-K":
            temp =   time.strptime(filings["acceptedDate"].split()[0], "%Y-%m-%d")
            if temp<s or temp>e: continue
            k_8.append(filings["reportUrl"])
            dates.append(filings["acceptedDate"].split()[0])
    k_8.reverse()
    dates.reverse()
    return k_8, dates
print(get_fil('aapl', '2015-02-15', '2020-03-14'))