import pickle
from sklearn.neural_network import MLPClassifier
import prepro

def predict_progress(input_files):
    loaded_model = pickle.load(open('model_saved.sav', 'rb'))
    return loaded_model.predict(prepro.preprocessing(input_files))