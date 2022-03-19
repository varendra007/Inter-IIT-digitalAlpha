import finnhub
import json
import requests
import time
from collections import OrderedDict


def market(ticker, start, end):
    url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='+ticker+'&apikey=UPGJXRX8G99R3BG5'
    start = time.strptime(start, "%Y-%m-%d")
    end = time.strptime(end, "%Y-%m-%d")
    r = requests.get(url)
    data = r.json()
    ans = []
    for date in data["Monthly Time Series"]:
        temp_date = time.strptime(date, "%Y-%m-%d")
        if temp_date<=end and temp_date>=start:
            ans.append([date, float(data["Monthly Time Series"][date]["4. close"])])
    return ans

def mar_graph(ticker, start, end):
    t = []
    v = []
    for lis in market(ticker, start, end):
        t.append(lis[0])
        v.append(lis[1])
    d = dict()
    d["time"] = t
    d["y"] = {"label": "$", "data": v}
    d["high"] = [start, end]
    return d


finnhub_client = finnhub.Client(api_key="c8o9j5qad3iddfsapu4g")


company = "msft" # input("Company ticker : ")
start_year = 2011 #int(input("Start year : "))
end_year = 2020 #int(input("End year : "))
plot_values = dict()
year_list = []
if(end_year >= start_year):
    year_list = [i for i in range(start_year,end_year+1)]
else:
    year_list = [end_year]

for i in year_list:
    plot_values[i] = dict()

global_year_list = year_list[:]

with open('10k.json', 'w') as f:
    json.dump(finnhub_client.financials_reported(symbol=company, freq='annualy'), f)


f = open("10k.json")
data = json.load(f)

# Cash and cash equivalents

for i in data["data"]:
    for j in i["report"]["cf"]:
        if(j["label"].upper() == "Net income".upper()):
            if(i["year"] not in plot_values.keys()):
                plot_values[i["year"]] = dict()
            plot_values[i["year"]][j["label"]] = j["value"]

# Total current liabilities

for i in data["data"]:
    for j in i["report"]["ic"]:
        if(j["label"].upper() == "Revenue".upper()):
            if(i["year"] not in plot_values.keys()):
                plot_values[i["year"]] = dict()            
            plot_values[i["year"]][j["label"]] = j["value"]


# Total assets

for i in data["data"]:
    for j in i["report"]["bs"]:
        if(j["label"].upper() == "Total assets".upper()):
            if(i["year"] not in plot_values.keys()):
                plot_values[i["year"]] = dict()
            plot_values[i["year"]][j["label"]] = j["value"]


# Total liabilities

for i in data["data"]:
    for j in i["report"]["bs"]:
        if(j["label"].upper() == "Total liabilities".upper()):
            if(i["year"] not in plot_values.keys()):
                plot_values[i["year"]] = dict()
            plot_values[i["year"]][j["label"]] = j["value"]


# Total current assets

for i in data["data"]:
    for j in i["report"]["bs"]:
        if(j["label"].upper() == "Total current assets".upper()):
            if(i["year"] not in plot_values.keys()):
                plot_values[i["year"]] = dict()
            plot_values[i["year"]][j["label"]] = j["value"]


f.close()

plot_values = OrderedDict(sorted(plot_values.items()))
plot_data = dict()

for k in plot_values:
    for j in plot_values[k]:
        if(j not in plot_data.keys()):
            plot_data[j] = {"time": [],"y":{"label":"$","data":[]},"high":[]}
        plot_data[j]["time"].append(k)
        plot_data[j]["y"]["data"].append(plot_values[k][j])

for k in plot_data:
    plot_data[k]["high"] = [str(start_year), str(end_year)]

plot_data["Stock Value"] = mar_graph(company, str(start_year)+'-01-01', str(end_year)+'-12-31')

temp_list = []
for i in plot_data:
    plot_data[i]["head"] = i
    temp_list.append(plot_data[i])

plot_data = {"result":temp_list}
with open("10kjson.json", "w") as outfile:
    json.dump(plot_data, outfile)