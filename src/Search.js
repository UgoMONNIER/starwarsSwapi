import { useEffect, useState } from "react";
import './Search.css';


const Search = ({allCharacters, filteredList, setFilteredList}) => {
    useEffect(() => {
      },[filteredList])


      const filter = (values) => {
        if (!values) {
          return filteredList;
        }

        setFilteredList(allCharacters.filter((character) => {
            const characterName = character.name.toLowerCase();
            return characterName.includes(values.toLowerCase());
          }))
      };


    return <div>
      <input class="form__field"  placeholder="Search a character" onChange={event => {
        filter(event.target.value)
        }} />
        <button type="submit">Search</button>
    </div>

}

export default Search;