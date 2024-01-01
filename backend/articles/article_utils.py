from elasticsearch_dsl import Search
from elasticsearch_dsl.query import MultiMatch , Match
from .models import Article
from elasticsearch_dsl import Search , Q , DateRange
from elasticsearch_dsl.query import MultiMatch
from datetime import date


def search_Article(q) : 
   
    #query = MultiMatch(query='einstein', fields=['title' , 'keywords', 'content' , 'authors.full_name' ] )
    
    s = Search(using='default')
   
    #s = s.query(query)
    

    #s = Search(using='default', index='article_index')
    
    #s = Search(index='article_index').query('match', authors_fullname="einstein")

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
    print(f"Number of hits: {response.hits.total.value}")

    for hit in response:
     authors_nested = hit.authors

     for author in authors_nested:
        full_name = author.full_name
        print(f"Author Full Name: {full_name}")

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
    print(f"Found {len(response)} hits")

    filtered_result_ids = [hit.id for hit in response]

    return filtered_result_ids
