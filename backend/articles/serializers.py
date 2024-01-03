from rest_framework import serializers
from .models import Article , Author

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['name' , 'institution']





class Article_results(serializers.ModelSerializer):
    author = AuthorSerializer(many=True , read_only=True)
    
    class Meta :
        model = Article
        fields = ['id' , 'title' , 'summary' , 'pdf' , 'author' ]
        
