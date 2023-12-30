from django_elasticsearch_dsl import (
    Document , fields , Index , Date
)

from .models import Article

PUBLISHER_INDEX = Index('article_index')

PUBLISHER_INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)

@PUBLISHER_INDEX.doc_type
class ArticleDocument(Document):
 
  id = id = fields.IntegerField(attr='id')

  title = fields.TextField(
        fields={
            'raw':{
                'type': 'keyword',
            }
            
        }
    )
  summary = fields.TextField(
        fields={
            'raw': {
                'type': 'keyword',
                
            }
        },
    )
  
  keywords  = fields.TextField(
        fields={
            'raw': {
                'type': 'keyword',
                
            }
        },
    ) 

  content  = fields.TextField(
        fields={
            'raw': {
                'type': 'keyword',
                
            }
        },
    )
  
  date = fields.DateField()

  class Django(object):
        model = Article