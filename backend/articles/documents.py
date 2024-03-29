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
 
  id = fields.IntegerField(attr='id')

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
        # fields={
        #     'raw': {
        #         'type': 'keyword',
                
        #     }
        # },
         analyzer='english',  # Use an appropriate analyzer for your language
    )
  
  date = fields.DateField()

  authors = fields.NestedField(properties={
        'full_name': fields.TextField(),
        'institut_name': fields.TextField(),
    })
  
  #authors_fullname = fields.TextField(attr='get_authors_fullname')

  class Django(object):
        model = Article

  def prepare_authors(self, instance):
        return [
            {
                'full_name': author.name,
                'institut_name': author.institution,
            }
            for author in instance.author.all()
        ]
  
  def prepare(self, instance):
        data = super().prepare(instance)
        data['author'] = self.prepare_authors(instance)
        return data
  
