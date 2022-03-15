import finnhub
import json
finnhub_client = finnhub.Client(api_key="c8o9j5qad3iddfsapu4g")


print(finnhub_client.symbol_lookup('2U inc'))

#print(finnhub_client.company_basic_financials('AAPL', 'all'))

#print(finnhub_client.financials_reported(symbol='AAPL', freq='quarterly'))

#print(finnhub_client.company_news('AAPL', _from="2020-06-01", to="2020-06-10"))

with open('sample1.json', 'w') as f:
    json.dump(finnhub_client.financials_reported(symbol='twou', freq='quarterly'), f)
    
with open('sample2.json', 'w') as f:
    json.dump(finnhub_client.company_basic_financials('twou', 'all'), f)
    
with open('sample3.json', 'w') as f:
    json.dump(finnhub_client.company_news('twou', _from="2018-06-01", to="2020-06-10"), f)