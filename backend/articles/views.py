
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status


class ArticlesAPIView(APIView):

    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many = True)
        return Response(serializer.data)
    
    def post(self, request):
        
        serializer = ArticleSerializer(data =  request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
    
    

  
    

