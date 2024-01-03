from hugchat import hugchat
from hugchat.login import Login
import PyPDF2
import re
import json
import ast
import os 




def extractpdf(path):
    email="Amine18"
    passwd="^NhAm5nm8ZLAC3D"



# Load cookies when you restart your program:
    sign = Login(email, None)
    current_directory = os.path.dirname(os.path.abspath(__file__))
    cookies_path = os.path.join(current_directory ,'..' , '..', 'cookies_snapshot')
    print(cookies_path)
    cookies = sign.loadCookiesFromDir(cookies_path) # This will detect if the JSON file exists, return cookies if it does and raise an Exception if it's not.

# Create a ChatBot
    chatbot = hugchat.ChatBot(cookies=cookies.get_dict())  # or cookie_path="usercookies/<email>.json"
    text = ""    
    page0 = "" 

    with open(path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            for i in range(len(pdf_reader.pages)):

                text += pdf_reader.pages[i].extract_text()
                if i==0:
                    page0 = pdf_reader.pages[0].extract_text()
 

    response = chatbot.query(f"extract as json  '{' title , authors with affiliation  , keywords section if it exists else let it empty , date of the event as date dd/mm/yyyy , the full asbtract section as it is until it ends ) '}'as they are from : {page0}  don t add the introduction", stream=True)
    response_str=""
    for token in response:
        if token is not None:
            response_str += str(token['token']) 
        else:
            continue
        

    
    introduction_pattern = re.compile(r'Introduction.*?References', re.IGNORECASE | re.DOTALL)
    introduction_text = introduction_pattern.findall(text)
    
    references_pattern = re.compile(r'References.*', re.IGNORECASE | re.DOTALL)
    references_text = references_pattern.findall(text)


    json_object = ast.literal_eval(response_str)
    json_object.update({"Introduction" : introduction_text})  
    json_object.update({ "References" : references_text})
        
    return json_object    

    

    

