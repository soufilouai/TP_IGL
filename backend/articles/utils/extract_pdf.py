from hugchat import hugchat
from hugchat.login import Login
import PyPDF2
import re
import json
import ast
import os 
from django.http import JsonResponse







def extractpdf(path):
    # Your code for loading cookies and creating ChatBot
    email = "Amine18"
    passwd = "^NhAm5nm8ZLAC3D"
    sign = Login(email, None)
    current_directory = os.path.dirname(os.path.abspath(__file__))
    cookies_path = os.path.join(current_directory, '..', '..', 'cookies_snapshot')
    cookies = sign.loadCookiesFromDir(cookies_path)
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())

    # Extract text from PDF
    text, page0 = extract_text_from_pdf(path)

    # Query ChatBot
    response = query_chatbot(chatbot, page0)

    # Extract Introduction and References
    introduction_text, references_text = extract_sections(text)

    # Build JSON object
    json_object = ast.literal_eval(response)
    json_object.update({"Introduction": introduction_text})
    json_object.update({"References": references_text})

    return json_object

def extract_text_from_pdf(pdf_path):
    text = ""
    page0 = ""

    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        for i in range(len(pdf_reader.pages)):
            text += pdf_reader.pages[i].extract_text()
            if i == 0:
                page0 = pdf_reader.pages[0].extract_text()

    return text, page0

def query_chatbot(chatbot, page0):
    query = f"extract  these sections as a json format object don t add additonal sentences i want it as json '{{'title', 'authors with affiliation and email', 'keywords section if it exists else let it empty', ' date':  'yyyy-mm-dd' which is the event date, 'the full asbtract section as it is until it ends'}}' as they are from: {page0} don't add the introduction all in utf8 respect the quotations and that the strings are terminated" 
    response_str = ""

    for token in chatbot.query(query, stream=True):
        if token is not None:
            response_str += str(token['token'])
        else:
            continue
    cleaned_response_str = clean_json_string(response_str)


    return cleaned_response_str

def extract_sections(text):
    introduction_pattern = re.compile(r'Introduction.*?References', re.IGNORECASE | re.DOTALL)
    introduction_text = introduction_pattern.findall(text)

    references_pattern = re.compile(r'References.*', re.IGNORECASE | re.DOTALL)
    references_text = references_pattern.findall(text)

    return introduction_text, references_text

def clean_json_string(json_str):
    # Replace special double quotation marks with standard ones
    cleaned_json_str = "".join(char for char in json_str if char.printable())
    return cleaned_json_str
    

    

