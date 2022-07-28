

import Axios from 'axios';
import Card from './Card';
import { useEffect, useState } from "react";
import './App.css';
import { Player } from '@lottiefiles/react-lottie-player';
import Search from './Search';



function App() {
  const [isFetching, setIsFetching] = useState(true);
  const [state, setState] = useState({ lottie: null });
  const [generatedfetchPeopleName, setfetchPeopleName] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [next, setNext] = useState('https://swapi.dev/api/people/');
  const fetchAllCharacters = () => {

    Axios.get(next)
      .then(
        (res) => {
          setAllCharacters([...allCharacters, ...res.data.results])
          setFilteredList(allCharacters)
          setNext(res.data.next)
          if (next === 'https://swapi.dev/api/people/?page=7') { setIsFetching(false) }
        }
      );
  };


  const fetchPeopleName = (peopleNumber) => {
    Axios.get(`https://swapi.dev/api/people/${peopleNumber}`)
      .then(
        (res) => {

          setfetchPeopleName(res.data.name);
        }
      );
  };

  useEffect(() => {
    fetchAllCharacters();
  },[filteredList])

  useEffect(() => {
  },[allCharacters])



  return (
    <div className="App">
      <Search setFilteredList={setFilteredList} filteredList={filteredList} allCharacters={allCharacters} />

      {isFetching && <Player
        lottieRef={instance => {
          setState({ lottie: instance }); // the lottie instance is returned in the argument of this prop. set it to your local state
        }}
        autoplay={true}
        mode={'scroll'}
        loop={true}
        controls={true}
        src="https://assets7.lottiefiles.com/packages/lf20_jHIZ5l.json"
        style={{ height: '800px', width: '800px', margin: 'auto' }}
      />}

      <div className="Grille">
        {
          filteredList.map((el, key) => (

            <Card key={key} character={el} setAllCharacters={setFilteredList} allCharacters={filteredList} 
              onClick={
                () => {

                }} />
          )
          )
        }
      </div>
    </div>
  );
}

export default App;
