
from rest_framework import generics
from .models import Article
from .serializers import ArticleSerializer
from rest_framework.decorators import APIView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
generics.CreateAPIView



# class ArticlesAPIView(APIView):

#     def get(self, request):
#         articles = Article.objects.all()
#         serializer = ArticleSerializer(articles, many = True)
#         return Response(serializer.data, status= status.HTTP_200_OK)
    
#     def post(self, request):
        
#         serializer = ArticleSerializer(data =  request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status= status.HTTP_201_CREATED)
#         return JsonResponse(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        

class ArticlesAPIView(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
# class ArticleDetails(APIView):

#     def get_object(self, id):
#         try:
#             return Article.objects.get(id=id)
#         except Article.DoesNotExist:
#             return Response(status= status.HTTP_404_NOT_FOUND)
        
#     def get(self, request, id ):
#         article = self.get_object(id)
#         serializer = ArticleSerializer(article)
#         return Response(serializer.data, status=status.HTTP_200_OK)

  
    

