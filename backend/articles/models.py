from django.db import models
from ckeditor.fields import RichTextField
import subprocess
from datetime import datetime


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
    author = models.ManyToManyField(Author, related_name='author', blank=True)
    keywords = models.CharField(max_length=255)
    content = models.TextField(
        db_column='content',
        db_index=True,
        default=None,
        db_collation='utf8mb4_general_ci'  # Adjust to your needs
    )
    pdf = models.CharField(max_length=255)
    date = models.DateField(
        default=datetime.now,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title

    def add_authors(self, author_data):
        """
        Add multiple authors to the article.
        :param author_data: List of dictionaries with author information.
                            Each dictionary should have 'name', 'institution', and 'email'.
        """
        for author_info in author_data:
            author, created = Author.objects.get_or_create(
                name=author_info['name'],
                institution=author_info['affiliation'],
                email=author_info['email']
            )
            self.author.add(author)  
    



