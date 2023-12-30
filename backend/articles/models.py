from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=255)
    summary = models.TextField()
    # author
    keywords = models.CharField(max_length=255)
    content = RichTextField()
    pdf = models.CharField(max_length=255)
    date = models.DateField()

    def __str__(self):
        return self.title
    
    def get_keywords_list(self):
        if self.keywords:
            return [keyword.strip() for keyword in self.keywords.split(',')]
        return []

    def set_keywords_list(self, keywords_list):
        self.keywords = ', '.join(keywords_list)


