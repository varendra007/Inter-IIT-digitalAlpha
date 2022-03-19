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




