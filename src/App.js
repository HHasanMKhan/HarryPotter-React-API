import { useState, useEffect } from "react";
import './App.css';

function App() {

  const [errorMsg, setErrorMsg] = useState('')
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setErrorMsg('');
        const response = await fetch('https://wizard-world-api.herokuapp.com/Spells');
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json();
        console.log(data);
        setSpells(data);
      } catch (error) {
        setErrorMsg("Oops, something went wrong...")
        console.log(error.message);
      }
    }
    fetchData();
  }, [])

  if (errorMsg !== '') {
    return (
      <h1>{errorMsg}</h1>
    )
  }

  return (
    <div>
      <h1>harry potter</h1>
      {spells.map((spell, index) => {
        return (
          <div key={index}>
            <h1>{spell.name}</h1>
            {spell.incantation == null ? (
              <h2>{ `Incantation: There is no incantation for this spell` }</h2>
              ) : <h2>{ `Incantation: ${spell.incantation}` }</h2>}
            <h2>Effect: {spell.effect}</h2>
          </div>
        )
      })}
    </div>
  );
}

export default App;
