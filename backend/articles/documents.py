from django_elasticsearch_dsl import (
    Document , fields , Index
)

from .models import Article

PUBLISHER_INDEX = Index('bdd_tp_igl')

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

  class Django(object):
        model = Article