from django.http import HttpResponse
import json
import sys
import os
from django.conf import settings
import finnhub
path=sys.path[0].split('\\')
for i in range(len(path)):
    if path[i]=='Inter-IIT-digitalAlpha':
        break
sys.path.append('/'.join(path[:i+1]))
#print(sys.path)
from ML_Model.final import predict_progress
from ML_Model.plot10k import main_part
from ML_Model.plot10q import main_10qpart

def index(request):
    if request.method == 'POST':
        # print(request.body)
        json_data = json.loads(request.body)
        # print(json_data)
        arrofstr=json_data['arr']
        # responseData=json.dumps(predict_progress(arrofstr))
        returned_list = predict_progress(arrofstr)
        res_dct = {str(i): str(returned_list[i]) for i in range(len(returned_list))}
        responseData = json.dumps(res_dct)
        #return HttpResponse(json.dumps(responseData), content_type="application/json")
        return HttpResponse(json.dumps(responseData), content_type="application/json")
    
def index10k(request):
    if request.method == 'POST':
        # print(request.body)
        json_data = json.loads(request.body)
        # print(json_data)
        arrofstr=json_data['arr']
        # responseData=json.dumps(predict_progress(arrofstr))
        returned_list = main_part(arrofstr['company'], arrofstr['start_year'], arrofstr['end_year'])
        # res_dct = {str(i): str(returned_list[i]) for i in range(len(returned_list))}
        # responseData = json.dumps(res_dct)
        #return HttpResponse(json.dumps(responseData), content_type="application/json")
        return HttpResponse(json.dumps(returned_list), content_type="application/json")
    
def index10q(request):
    if request.method == 'POST':
        # print(request.body)
        json_data = json.loads(request.body)
        print(json_data)
        # print(json_data)
        arrofstr=json_data['arr']
        # responseData=json.dumps(predict_progress(arrofstr))
        # returned_list = main_10qpart(arrofstr)
        returned_list = main_10qpart(arrofstr['company'], arrofstr['start_year'], arrofstr['end_year'])
        # print(returned_list)
        # res_dct = {str(i): str(returned_list[i]) for i in range(len(returned_list))}
        # responseData = json.dumps(res_dct)
        #return HttpResponse(json.dumps(responseData), content_type="application/json")
        return HttpResponse(json.dumps(returned_list), content_type="application/json")