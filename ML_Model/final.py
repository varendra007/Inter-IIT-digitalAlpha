import pickle
from sklearn.neural_network import MLPClassifier
import prepro
import sys

def predict_progress(input_files):
    loaded_model = pickle.load(open('model_saved.sav', 'rb'))
    return loaded_model.predict(prepro.preprocessing(input_files))

# loaded_model = pickle.load(open('model_saved.sav', 'rb'))
# # input_files = input("give some input")
# # print(loaded_model.predict(prepro.preprocessing([input_files]))[0])
# print(loaded_model.predict(prepro.preprocessing(sys.argv[1:])))