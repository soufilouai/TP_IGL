from django.db import models
from ckeditor.fields import RichTextField
import subprocess


# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    email = models.EmailField()
    
    
    def __str__(self):
        return self.name
    

class Article(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    author = models.ManyToManyField(Author, related_name='author',blank=True)
    keywords = models.CharField(max_length=255)
    content = RichTextField()
    pdf = models.CharField(max_length=255)
    date = models.DateTimeField()

    def __str__(self):
        return self.title
    
    


