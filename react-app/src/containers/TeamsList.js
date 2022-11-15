import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const GET_TEAMS = gql`
  query {
    teams {
        id
        name
    }
  }
`;

export default function TeamsList(props) {
  const [value, setValue] = useState('');

 const handleChange = (event) => {
   setValue(event.target.value);
   props.onChange(event.target.value);
 };
  const { data, loading } = useQuery(GET_TEAMS);
  return (
    
    <><div> {loading ? ( <p>Loading teams</p> ): ( <select value={value} onChange={handleChange}> {data.teams.map((team) => ( <option value={team.id} key={team.id}>{team.name}</option> ))} </select> )} </div></>
   
  );
}
