import pickle
from sklearn.neural_network import MLPClassifier
import ML_Model.prepro as prepro
import sys
import os

def predict_progress(input_files):
    dirpath = os.path.dirname(os.path.abspath(__file__))
    chap_dirpath = os.path.join(dirpath, 'model_saved.sav')
    loaded_model = pickle.load(open(chap_dirpath, 'rb'))
    # A = []
    # for k in loaded_model.predict(prepro.preprocessing(input_files)): A.append(int(dict[k]))
    # value = max(set(A), key = A.count)
    return loaded_model.predict(prepro.preprocessing(input_files))

# loaded_model = pickle.load(open('model_saved.sav', 'rb'))
# # input_files = input("give some input")
# # print(loaded_model.predict(prepro.preprocessing([input_files]))[0])
# print(loaded_model.predict(prepro.preprocessing(sys.argv[1:])))