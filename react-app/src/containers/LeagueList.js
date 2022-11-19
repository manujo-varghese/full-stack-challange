import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import React, {useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';
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
  const onSelect = (selectedList, selectedItem) => {
    setValue(selectedList.map(item => item.id));
    props.onChange(value);
  };
  const onRemove = (selectedList, selectedItem) => {
    setValue(selectedList.map(item => item.id));
    props.onChange(value);
  };

  const { data, loading } = useQuery(GET_LEAGUES);
  return (
    
    <><div> {loading ? ( <p>Loading Leagues</p> ): ( <Multiselect
      options={data.leagues} // Options to display in the dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
      />
        )} </div></>
   
  );
}
