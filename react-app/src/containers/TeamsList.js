import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import React, {useState} from 'react';
import Multiselect from 'multiselect-react-dropdown';
const GET_TEAMS = gql`
  query getTeams{
    teams {
        id
        name
    }
  }
`;

export default function TeamsList(props) {
  const [value, setValue] = useState('');
  const onSelect = (selectedList, selectedItem) => {
  setValue(selectedList.map(item => item.id));
  props.onChange(value);
};
const onRemove = (selectedList, selectedItem) => {
  setValue(selectedList.map(item => item.id));
  props.onChange(value);
};
  const { data, loading } = useQuery(GET_TEAMS);
  return (
    
    
    <><div> {loading ? ( <p>Loading Teams</p> ): ( <Multiselect
      options={data.teams} // Options to display in the dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
      />
        )} </div></>
  );
}
