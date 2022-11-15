import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
const GET_SINGLE_ARTICLE = gql`
  query getSingleArticle($articleId: ID!){
    article(articleId: $articleId) {
        id
        title
        imageUrlString
        body
        team{
          name
        }

    }
  }
`;

export default function Article() {
  const params = useParams();
  const articleId =params.articleId;
  const {loading, data} = useQuery(GET_SINGLE_ARTICLE, {
    variables: {articleId:articleId }
  });
  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <><div>
            <h5 className="title">{data.article.title}</h5>
            <div className="text-center">
              <span className="tag">Team</span> <span className="author">{data.article.team.name}</span>
            </div>
            <img className="img" src={data.article.imageUrlString} alt='athletic'></img>
          </div><div className="body">
              {data.article.body}
            </div></>
        )}
    </div>
      );
}
