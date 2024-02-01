from rest_framework import serializers
from .models import *

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'email']


class ArticleSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=True)
    class Meta:
        model = Article
        fields = ('id' , 'title' ,'summary', 'keywords','author' )
        
        
    def update(self, instance, validated_data):
        
        
        print('validated ', validated_data)
        authors_id_set =  instance.author.values_list('id', flat=True)
       
        for id in authors_id_set:
            instance.author.remove(id)
        authors_data = validated_data.pop('author', [])
        instance.title = validated_data.get('title', instance.title)
        instance.summary = validated_data.get('summary', instance.summary)
        instance.keywords = validated_data.get('keywords', instance.keywords)

        # # Update authors
        
        
        
        
        for author_data in authors_data:
            # Create new author
            new_author = Author.objects.create(**author_data)
            instance.author.add(new_author)
                

        instance.save()
        return instance
    
    
    







class Article_results(serializers.ModelSerializer):
    author = AuthorSerializer(many=True , read_only=True)
    
    class Meta :
        model = Article
        fields = ['id' , 'title' , 'summary' , 'pdf' , 'author' ,'pdf'  ]


class Article_modification(serializers.ModelSerializer):
    author = AuthorSerializer(many=True , read_only=True)
    
    class Meta :
        model = Article
        fields = ['id' , 'title' , 'summary' , 'keywords' , 'author' , 'content' , 'pdf'  ]



class Article_Favoris(serializers.ModelSerializer):
   
    class Meta :
        model = Article
        fields = ['id']
        
