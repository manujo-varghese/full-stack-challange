import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import React from 'react';

const GET_TEAMS = gql`
  query getTeams {
    teams {
      id
      createdAt
      name
      league {
        id
        title
      }
    }
  }
`;

export default function Teams() {
  const { data, loading } = useQuery(GET_TEAMS);
  return (
    <div>
      <h1>Teams</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <p>
          {data.teams.map(team => (
            <span key={team.id}>{team.name}&nbsp;</span>
          ))}
        </p>
      )}
    </div>
  );
}
