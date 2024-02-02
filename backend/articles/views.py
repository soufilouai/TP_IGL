
from rest_framework import generics
from .models import Article , Author
from .serializers import ArticleSerializer
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.models import Permission , Group
from rest_framework import status,permissions
from rest_framework.permissions import IsAuthenticated
from .utils.extract_pdf import extractpdf
from django.http import HttpResponse
import os
import dropbox 
import json
import ast
import time 
from .utils.credentials import ACCESS_TOKEN
from datetime import datetime
from dateutil.parser import parse






class CanModerateContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'can_moderate_content' permission
        
       
        return request.user.is_moderator

class ArticlesAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
   

class ArticleDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]

    
def extract(pdf_path):
    return extractpdf(pdf_path)   

def upload_to_dropbox(pdf_path):


    # Initialize Dropbox client
    dbx = dropbox.Dropbox(ACCESS_TOKEN)

    # Generate a unique filename using the current timestamp
    timestamp = int(time.time())
    filename = f'PDF_{timestamp}.pdf'

    # Upload the file with the generated filename
    # with open(pdf_path, 'rb') as f:
    #     dbx.files_upload(f.read(), '/' + filename)

    return filename



def upload(request):


    if request.method=='POST':
        current_directory = os.path.dirname(os.path.abspath(__file__))
     
        pdf_path = os.path.join(current_directory ,'..',  'EchantillonsArticles', f'Article_0{i}.pdf' if i<10 else f'Article_{i}.pdf')
        #pdf_path = request.GET.get('pdf_path', None)

        if pdf_path:
            filename=upload_to_dropbox(pdf_path=pdf_path)
   
            json_data = extract(pdf_path)
            if json_data.get('date')!='' and len(json_data.get('date'))>9:
             try:
                article  = Article.objects.create(title=json_data["title"],summary=json_data["abstract"],keywords=json_data["keywords"],pdf=filename,date=json_data["date"],content=json_data["Introduction"])
             except:
                article = Article.objects.create(title=json_data["title"],summary=json_data["abstract"],keywords=json_data["keywords"],pdf=filename,date=json_data["date"])
            
            else:
                try:
                    print('sewy')
                    article  = Article.objects.create(title=json_data["title"],summary=json_data["abstract"],keywords=json_data["keywords"],pdf=filename,content=json_data["Introduction"])
                except :
                     article  = Article.objects.create(title=json_data["title"],summary=json_data["abstract"],keywords=json_data["keywords"],pdf=filename)



            article.add_authors(json_data["authors"])
            authors_data = json_data.get("authors", [])

            for author_info in json_data.get("authors", []):
                author, created = Author.objects.get_or_create(
                name=author_info['name'],
                institution=author_info['affiliation'],
                email=author_info['email']
     )
                author.save()


            article.save()
        else:
          return HttpResponse("PDF path not provided in the request.")
        
        

        
    
        # current_directory = os.path.dirname(os.path.abspath(__file__))
        # path = os.path.join(current_directory ,'..',  'drive-download-20231228T162223Z-001', f'Article_03.pdf')
        # Response = extractpdf(path)
    
    
    return HttpResponse()




