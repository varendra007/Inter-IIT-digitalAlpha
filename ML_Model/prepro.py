import nltk
import requests
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from string import punctuation
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neural_network import MLPClassifier
import pickle
import os

# from nltk.corpus import stopwords
# stopwords_en = stopwords.words('english')
# from string import punctuation
# stopwords_en.append(set(punctuation))

def extract_entity_name(t):
    entity_names = []

    if hasattr(t, 'label') and t.label:
        if t.label() == 'NE':
            entity_names.append(" ".join([child[0] for child in t]))
        else:
            for child in t:
                entity_names.extend(extract_entity_name(child))
    
    return entity_names

def preprocessing(list_of_links):
    dirpath = os.path.dirname(os.path.abspath(__file__))
    chap_dirpath1 = os.path.join(dirpath, 'vectorizer.pkl')
    vect_file = open(chap_dirpath1, 'rb')
    tfidf_obj = pickle.load(vect_file)
    stopwords_en = stopwords.words('english')
    stopwords_en.append(set(punctuation))
    modified_files = []
    for pred_file in list_of_links:
        req = requests.get(pred_file)
        soup = BeautifulSoup(req.content, 'html.parser')

        sent_token = nltk.sent_tokenize(soup.get_text())

        tagged_sentences = []
        for i in sent_token:
            wordslist = nltk.word_tokenize(i)
            wordslist = [w for w in wordslist if not w in stopwords_en]
            tagged = nltk.pos_tag(wordslist)
            tagged_sentences.append(tagged)


        chunked_sentences = nltk.ne_chunk_sents(tagged_sentences, binary=True)

        entity_names = []
        for tree in chunked_sentences:
            entity_names.extend(extract_entity_name(tree))

        s = " "
        ip_data = s.join(entity_names)
        modified_files.append(ip_data)

    tfidf_test = tfidf_obj.transform(modified_files)
    return tfidf_test

# print(preprocessing(['https://www.sec.gov/Archives/edgar/data/1459417/000110465918071972/a18-41232_18k.htm']))