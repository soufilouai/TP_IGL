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
        fields={
            'raw': {
                'type': 'keyword',
                
            }
        },
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
                'full_name': author.fullname,
                'institut_name': author.institut,
            }
            for author in instance.authors.all()
        ]
  
  def prepare(self, instance):
        data = super().prepare(instance)
        data['authors'] = self.prepare_authors(instance)
        return data
  
  """def get_authors_fullname(self, instance):
        authors_fullname = [author.fullname for author in instance.authors.all()]
       
        return authors_fullname"""