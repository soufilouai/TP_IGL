from elasticsearch_dsl import Search
from elasticsearch_dsl.query import MultiMatch , Match
from .models import Article
from elasticsearch_dsl import Search , Q , DateRange
from elasticsearch_dsl.query import MultiMatch
from datetime import date

Discover_num = 10


def search_Article(q) : 
   
    
    s = Search(using='default')
   

    s = s.query('bool', should=[
        {'nested': {
            'path': 'authors',
            'query': {
                'bool': {
                    'must': [
                        {'match': {'authors.full_name': q}}
                    ]
                }
            }
        }},
        {'multi_match': {
            'query': q,
            'fields': ['title', 'keywords', 'content'],
        }}
    ])
    

    s = s.sort('-date')

    
    
    response = s.execute()
   


    list = [] 

    for hit in response :
     list.append(hit.id)
    
    return list


def filter_results(result_ids, institut=None , author=None, keywords=None):
   
    s = Search(using='default').query(Q('ids', values=result_ids))
    if author:
        s = s.query('nested', path='authors', query={
          'bool': {
            'filter': [
                {'match': {'authors.full_name': author}}
            ]
        }
       })

    if keywords:
        s = s.filter('term', keywords=keywords)

    if institut:
         s = s.query('nested', path='authors', query={
          'bool': {
            'filter': [
                {'match': {'authors.full_name': institut}}
            ]
        }
       })
  

    s = s.sort('-date')
    response = s.execute()
    filtered_result_ids = [hit.id for hit in response]

    return filtered_result_ids
    

def filter_date(result_ids , date_debut , date_fin ) :

    s = Search(using='default').query(Q('ids', values=result_ids))
    s = s.filter('range', date={'gte': date_debut, 'lte': date_fin})

    s.sort("-date")
    response = s.execute()

    filtered_result_ids = [hit.id for hit in response]

    return filtered_result_ids


def discover_Article():
   s = Search(using='default', index='article_index')
   s = s.sort('-date')
   s = s.extra(size=Discover_num)
   response = s.execute()
   list = [] 

   for hit in response :
     list.append(hit.id)
    
   return list
   
 
