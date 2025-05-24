# try:
#     import pke
#     print("module 'pke' is installed")
# except ModuleNotFoundError:
#     print("module 'pke' is not installed")
# try:
#     import sklearn
#     print("module 'sklearn' is installed")
# except ModuleNotFoundError:
#     print("module 'sklearn' is not installed")
# try:
#     import pandas
#     print("module 'pandas' is installed")
# except ModuleNotFoundError:
#     print("module 'pandas' is not installed")
# exit()
import pke
import sys

# print('Hello')
# print(text)
# exit()

def get_new_keywords(text):
    # define the set of valid Part-of-Speeches
    pos = {'NOUN', 'PROPN', 'ADJ'}
    text = text.replace('@', '')
    text = text.replace('#', '')
    # 1. create a SingleRank extractor.
    extractor = pke.unsupervised.SingleRank()

    # 2. load the content of the document.
    extractor.load_document(input=text,
                            language='en',
                            normalization=None)

    # 3. select the longest sequences of nouns and adjectives as candidates.
    extractor.candidate_selection(pos=pos)

    # 4. weight the candidates using the sum of their word's scores that are
    #    computed using random walk. In the graph, nodes are words of
    #    certain part-of-speech (nouns and adjectives) that are connected if
    #    they occur in a window of 10 words.
    extractor.candidate_weighting(window=10,
                                  pos=pos)

    # 5. get the 10-highest scored candidates as keyphrases
    keyphrases = extractor.get_n_best(n=50)
    keywords = [k[0] for k in keyphrases if len(k[0].split()) < 5]
    listToStr = ','.join(map(str, keywords))
    return listToStr
text= sys.argv[1]
print(get_new_keywords(text))