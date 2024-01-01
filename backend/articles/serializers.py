from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class Article_results(serializers.ModelSerializer):
    class Meta :
        model = Article
        fields = ('id' , 'title' , 'content' , 'pdf' )