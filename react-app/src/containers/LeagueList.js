import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const GET_LEAGUES = gql`
  query {
    leagues {
        id
        name
    }
  }
`;

export default function LeaguesList(props) {
  const [value, setValue] = useState('');

 const handleChange = (event) => {

   setValue(event.target.value);
   props.onChange(event.target.value);

 };
  const { data, loading } = useQuery(GET_LEAGUES);
  return (
    
    <><div> {loading ? ( <p>Loading leagues</p> ): ( <select value={value} onChange={handleChange}> {data.leagues.map((league) => ( <option value={league.id} key={league.id}>{league.name}</option> ))} </select> )} </div></>
   
  );
}
