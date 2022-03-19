from django.http import HttpResponse
import json
import sys
import os
from django.conf import settings
path=sys.path[0].split('\\')
for i in range(len(path)):
    if path[i]=='Inter-IIT-digitalAlpha':
        break
sys.path.append('/'.join(path[:i+1]))
#print(sys.path)
from ML_Model.final import predict_progress

def index(request):
    if request.method == 'POST':
        json_data = request.POST.get() 
        arrofstr=json_data['arr']
        responseData=json.dumps(predict_progress(arrofstr))
        return HttpResponse(json.dumps(responseData), content_type="application/json")