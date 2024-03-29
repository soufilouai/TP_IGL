
from rest_framework import generics
from .models import Article
from .serializers import *
from .models import Article , Author
from .serializers import ArticleSerializer
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Permission , Group
from rest_framework import status,permissions
from rest_framework.permissions import IsAuthenticated
from .utils.extract_pdf import extractpdf
from django.http import HttpResponse
import os
import json
import time 
#from .utils.credentials import ACCESS_TOKEN
from datetime import datetime
from dateutil.parser import parse


from .article_utils import *
import json 


class CanModerateContentPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the 'can_moderate_content' permission
        
       
        return request.user.is_moderator

class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user has the admin  permission
        
       
        return request.user.is_superuser

class ArticlesAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    
   

class ArticleDetails(generics.RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    
    
class ArticlesModAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
   

class ArticleDetailsMod(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated,CanModerateContentPermission]
    
    
    
class ArticleAddFav(generics.RetrieveUpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request,*args, **kwargs):
        article = self.get_object()
        user = request.user  # Assuming you have authentication enabled

        if user.is_authenticated:
            # Add the article to the user's favorites
            if (user.favorite_articles.filter(pk=article.pk).exists()):
                user.favorite_articles.remove(article)
               
                return Response({'detail': 'Article removed from favorites successfully.'}, status=status.HTTP_200_OK)
            else:
                user.favorite_articles.add(article)
                
                return Response({'detail': 'Article added to favorites successfully.'}, status=status.HTTP_200_OK)
                
        else:
            return Response({'detail': 'Authentication required to add favorites.'}, status=status.HTTP_401_UNAUTHORIZED)
    



class SearchResults(APIView):
    
    permission_classes = [IsAuthenticated]
    def post(self, request):
        if request.method == 'POST':
        
            data = request.data
            
    
            query = data.get('keywords')
            
        
            search_results_ids = search_Article(query)
            
            
            articles = Article.objects.filter(id__in=search_results_ids)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)

            return Response(json_data, status=status.HTTP_200_OK)

            
        
    def get(self, request):
        if request.method == 'GET':
            resultat = discover_Article()
            articles = Article.objects.filter(id__in=resultat)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)

            return Response(json_data, status=status.HTTP_200_OK)
        

class Filter_results(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        
            data = request.data
            k= data.get('keywords')
            keywords = k.get('keywords')
            author = k.get('author')
            institution = k.get('institution')
            start_date = k.get('start_date')
            end_date = k.get('end_date')


            query = k.get('keyword')
            
            if (query!="") : search_results_ids = search_Article(query)
            
            results = filter_results(search_results_ids ,institution , author , keywords)
           
            if (start_date!="" and  end_date !="" and start_date<= end_date) :
              results = filter_date(results , start_date , end_date)

            
            articles = Article.objects.filter(id__in=results)
            
            
            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)

        
            return Response(json_data, status=status.HTTP_200_OK)
        


class Favorislist(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if request.method == 'GET':
            user = request.user
            user_favorite_article_ids = user.favorite_articles.values_list('id', flat=True)
            articles = Article.objects.filter(id__in=user_favorite_article_ids)

            serializer = Article_Favoris(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)
            return Response(json_data, status=status.HTTP_200_OK)
        


class Favoris(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        if request.method == 'GET':
            user = request.user
            user_favorite_article_ids = user.favorite_articles.values_list('id', flat=True)
            articles = Article.objects.filter(id__in=user_favorite_article_ids)

            serializer = Article_results(articles, many=True)
            serialized_data = serializer.data
            json_data = json.dumps(serialized_data)
            return Response(json_data, status=status.HTTP_200_OK)
        
        



    

                
            
def extract(pdf_path):
    return extractpdf(pdf_path)   



def upload_to_folder(pdf_file):

    current_directory = os.path.dirname(os.path.abspath(__file__))
    
    

    # Generate a unique filename using the current timestamp
    timestamp = int(time.time())
    filename = f'PDF_{timestamp}.pdf'
    path = os.path.join(current_directory ,'..' ,'media', filename)
    with open(path, 'wb') as destination:
            for chunk in pdf_file.chunks():
                destination.write(chunk)

    return filename



class Uploadarticle(APIView):

        permission_classes = [AdminPermission]


        def post(self, request, *args, **kwargs):
              if request.method == 'POST':
                pdf_file = request.FILES.get('pdf_file')
                #pdf_path = request.GET.get('pdf_path', None)

                if pdf_file:
                         # Process the uploaded file here
                    filename = upload_to_folder(pdf_file)
                    
        
                    json_data = extract(pdf_file)
                    if json_data.get('date')!='' :


                        article  = Article.objects.create(title=json_data["title"],summary=json_data["abstract"],keywords=json_data["keywords"],pdf=filename,date=json_data["date"],content=json_data["Introduction"])
         
                    
                    else:
    
                        article  = Article.objects.create(title=json_data["title"],summary=json_data["abstract"],keywords=json_data["keywords"],pdf=filename,content=json_data["Introduction"])
                        
                        



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
    
              return HttpResponse()
        
        



class Geturlarticle(APIView):

        permission_classes = [permissions.AllowAny]

        def get(self, request, *args, **kwargs):
         filename = request.query_params.get('filename')
         if filename:
            return Response({"file_path": 'http://localhost:8000/media/'+filename})
         else:
            return Response({"error": "Filename not provided in the URL parameters."}, status=400)


        



