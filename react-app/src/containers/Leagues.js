import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';

const GET_LEAGUES = gql`
  query {
    leagues{
        id
        name
        title
        sportType
    }
  }
`;

export default function Leagues() {
  const { data, loading } = useQuery(GET_LEAGUES);
  return (
    <div>
      <h1>Leagues</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <p>
          {data.leagues.map(league => (
            <span key={league.id}>{league.title}&nbsp;</span>
          ))}
        </p>
      )}
    </div>
  );
}
