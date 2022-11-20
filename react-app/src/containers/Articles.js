import { gql } from 'apollo-boost';
import { useQuery  } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

const GET_ARTICLES = gql`
  query ArticleQuery($pageSize:Int,$after: String){
    articles(pageSize:$pageSize,after: $after) {
        cursor
        hasMore
        articles{
        id
        title
        imageUrlString
        body
        }
    }
  }
`;

export default function Articles() {
  const { data, loading, fetchMore } = useQuery(GET_ARTICLES,
    ({
      variables: { pageSize: 9 },
      fetchPolicy: 'cache-and-network'
    }));
  return (
      <><div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="grid">
          {data.articles &&
            data.articles.articles &&
            data.articles.articles.map(article => (<article className="content" key={article.id} id={article.id}> <h2>{article.title}</h2> <Link to={`/article/${article.id}`}><img className="fakeimg" src={article.imageUrlString} alt='athletic'></img></Link> </article>))}
        </div>
      )}

    </div><div>
        { !loading && data.articles && data.articles.hasMore ? (<button className="button"
          onClick={() => fetchMore({
            variables: {
              pageSize: 9,
              after: data.articles.cursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult)
                return prev;
              return {
                ...fetchMoreResult,
                articles: {
                  ...fetchMoreResult.articles,
                  articles: [
                    ...prev.articles.articles,
                    ...fetchMoreResult.articles.articles,
                  ],
                },
              };
            },
          })}
        >
          Load More
        </button>):<p></p>}
      </div></>
   
  );
}
