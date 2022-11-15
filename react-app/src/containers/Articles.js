import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Link } from 'react-router-dom';
const GET_ARTICLES = gql`
  query ArticleQuery($after: String){
    articles(after: $after) {
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
  const { data, loading, fetchMore } = useQuery(GET_ARTICLES);
 console.log(fetchMore);
  return (
      <><><div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <><div className="grid">
          {data.articles &&
            data.articles.articles &&
            data.articles.articles.map(article => (<article className="content" key={article.id} id={article.id}> <h2>{article.title}</h2> <Link to={`/article/${article.id}`}><img className="fakeimg" src={article.imageUrlString} alt='athletic'></img></Link> </article>))}
        </div>
        </>
      )}

    </div></><div>
      {data && data.articles.hasMore ? (<button className="button"
                onClick={() =>
                  fetchMore({
                    variables: {
                      after: data.articles.cursor,
                    },
                    updateQuery: (prev, { fetchMoreResult }) => {
                      if (!fetchMoreResult) return prev;
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
                  })
                }
              >
                Load More
              </button>):<p>End of Results</p>}
      </div></>
   
  );
}
