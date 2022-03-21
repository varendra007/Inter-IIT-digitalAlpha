import finnhub
import json
import matplotlib.pyplot as plt
from collections import OrderedDict
finnhub_client = finnhub.Client(api_key="c8o9j5qad3iddfsapu4g")


def main_10qpart(company, start_year, end_year):
    # company = "msft" # input("Company ticker : ")
    # start_year = 2011 #int(input("Start year : "))
    # end_year = 2020 #int(input("End year : "))
    metric = "Total assets"

    year_list = []
    plot_values = dict()

    if(end_year >= start_year):
        year_list = [i for i in range(start_year,end_year+1)]
    else:
        year_list = [end_year]
        
    for i in year_list:
        plot_values[i] = dict()

    with open('10q.json', 'w') as f:
        json.dump(finnhub_client.financials_reported(symbol=company, freq='quarterly'), f)

    f = open("10q.json")
    data = json.load(f)

    # Cash and cash equivalents

    for i in data["data"]:
        for j in i["report"]["bs"]:
            if(j["label"].upper() == "Cash and cash equivalents".upper()):
                if(i["year"] not in plot_values.keys()):
                    plot_values[i["year"]] = dict()
                plot_values[i["year"]][j["label"]] = j["value"]

    # Total current liabilities

    for i in data["data"]:
        for j in i["report"]["bs"]:
            if(j["label"].upper() == "Total current liabilities".upper()):
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

    # given metric
    if metric and  metric!='':
        for i in data["data"]:
            for j in i["report"]["bs"]:
                if(metric.upper() == j["label"].upper()):
                    if(i["year"] not in plot_values.keys()):
                        plot_values[i["year"]] = dict()
                    plot_values[i["year"]][j["label"]] = j["value"]
            for j in i["report"]["cf"]:
                if(metric.upper() == j["label"].upper()):
                    if(i["year"] not in plot_values.keys()):
                        plot_values[i["year"]] = dict()
                    plot_values[i["year"]][j["label"]] = j["value"]
            for j in i["report"]["ic"]:
                if(metric.upper() == j["label"].upper()):
                    if(i["year"] not in plot_values.keys()):
                        plot_values[i["year"]] = dict()
                    plot_values[i["year"]][j["label"]] = j["value"]

    f.close()

    plot_values = OrderedDict(sorted(plot_values.items()))
    plot_data = dict()

    for k in plot_values:
        for j in plot_values[k]:
            if(j.capitalize() not in plot_data.keys()):
                plot_data[j.capitalize()] = {"time": [],"y":{"label":"$","data":[]},"high":[]}
            plot_data[j.capitalize()]["time"].append(k)
            plot_data[j.capitalize()]["y"]["data"].append(plot_values[k][j])

    for k in plot_data:
        plot_data[k]["high"] = [str(start_year), str(end_year)]
        
    temp_list = []
    for i in plot_data:
        plot_data[i]["head"] = i
        temp_list.append(plot_data[i])

    plot_data = {"result":temp_list}
    # with open("10qjson.json", "w") as outfile:
    #     json.dump(plot_data, outfile)
    return plot_data





