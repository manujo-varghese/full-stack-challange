import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import TeamsList from './TeamsList';
import LeaguesList from './LeagueList';

const GET_ARTICLE_REVERSE = gql`
  query articlesInReverseChronological($filter: ArticlesFilters!){
    articlesInReverseChronological(filter: $filter) {
        id
        title
        imageUrlString
        body
    }
  }
`;

export default function UserFeed() {
  const [teamValue, setTeamValue] = useState(null);
  const [leagueValue, setLeagueValue] = useState(null);
  const getTeamData = (data) =>{
    setTeamValue(data);
  }
  const getLeagueData = (data) =>{
    setLeagueValue(data);
  }
  const {loading, data} = useQuery(GET_ARTICLE_REVERSE, {
    variables: {filter:{teamIds:teamValue,leagueIds:leagueValue,join:true} }
});
  return (
      <><div style={{ display: "flex", gap: "1rem" }}>
        <h3> Select your favorite Teams and Leagues </h3>
        <TeamsList onChange={getTeamData}/>
        <LeaguesList onChange={getLeagueData}/>
        </div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <><div className="grid">
          {data.articlesInReverseChronological.map(article => (<article className="content" key={article.id}> <h2>{article.title}</h2> <Link to={`/article/${article.id}`}><img className="fakeimg" src={article.imageUrlString} alt='athletic'></img></Link> </article>))}
        </div></>
      )}
   </>
   
  );
}
