import requests
def market(split, start, end, ticker):
    r = requests.get('https://data.nasdaq.com/api/v3/datasets/WIKI/'+ticker+'.json?start_date='+start+'&end_date='+end+'&order=asc&column_index=4&collapse='+split+'&transformation=rdiff')
    r = r.json()
    return r['dataset']['data']

print(market('monthly', '2015-05-01', '2017-07-01', 'twou'))