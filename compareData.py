import finnhub
import json
import matplotlib.pyplot as plt
finnhub_client = finnhub.Client(api_key="c8o9j5qad3iddfsapu4g")


company = input("Company ticker : ")
start_year = int(input("Start year : "))
end_year = int(input("End year : "))
year_list = []
if(end_year >= start_year):
    year_list = [i for i in range(start_year,end_year+1)]
else:
    year_list = [end_year]
    
with open('10q.json', 'w') as f:
    json.dump(finnhub_client.financials_reported(symbol=company, freq='quarterly'), f)

f = open("10q.json")
output = open("10q_plot.txt","w")
data = json.load(f)
plot_list = []

# Cash and cash equivalents

for i in data["data"]:
    # print(i["year"])
    if(i["year"] in year_list):
        for j in i["report"]["bs"]:
            if(j["label"].upper() == "Cash and cash equivalents".upper()):
                string = "Cash and cash equivalents," + str(i["year"]) + "," + str(j["value"]) +","+ i["filedDate"] +"\n"
                plot_list.append(string)

output.write(str(len(plot_list)))
output.write("\n")
for i in plot_list:
    output.write(i)
plot_list = []

# Total current liabilities

for i in data["data"]:
    if(i["year"] in year_list):
        for j in i["report"]["bs"]:
            if(j["label"].upper() == "Total current liabilities".upper()):
                string = "Total current liabilities," + str(i["year"]) + "," + str(j["value"]) +","+ i["filedDate"]  + "\n"
                plot_list.append(string)
output.write(str(len(plot_list)))
output.write("\n")
for i in plot_list:
    output.write(i)
plot_list = []

# Total current assets

for i in data["data"]:
    if(i["year"] in year_list):
        for j in i["report"]["bs"]:
            if(j["label"].upper() == "Total current assets".upper()):
                string = "Total current assets," + str(i["year"]) + "," + str(j["value"]) +","+ i["filedDate"]  + "\n"
                plot_list.append(string)

output.write(str(len(plot_list)))
output.write("\n")
for i in plot_list:
    output.write(i)
plot_list = []

output.close()
f.close()

plot = open("10q_plot.txt","r")



