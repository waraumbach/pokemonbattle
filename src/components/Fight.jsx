import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Fight() {
  let { state } = useLocation();
  console.log(state);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching list of Pokemon from API

  const fetchPokemon = async () => {
    try {
      if (state && state.selectedPokemon) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/${state.selectedPokemon}`
        );
        setPokemonList(response.data);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const selectRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemonList.length);
    setSelectedPokemon(pokemonList[randomIndex]);
  };

  const startBattle = () => {
    selectRandomPokemon();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 15)}`)
      .then((response) => {
        setEnemyPokemon(response.data);
        // Simulate battle result (for demonstration purposes)
        const result = Math.random() < 0.5 ? "You win!" : "You lose!";
        setBattleResult(result);
      })
      .catch((error) => {
        console.error("Error fetching enemy Pokemon:", error);
      });
  };

  return (
    <div>
      <h1>Pokemon Game</h1>

      <button onClick={startBattle}>Start Battle</button>
      {selectedPokemon && (
        <div>
          <h2>Your Pokemon: {selectedPokemon.name}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
            alt={selectedPokemon.name}
          />
        </div>
      )}
      {enemyPokemon && (
        <div>
          <h2>Enemy Pokemon: {enemyPokemon.name}</h2>
          <img
            src={enemyPokemon.sprites.front_default}
            alt={enemyPokemon.name}
          />
        </div>
      )}
      {battleResult && <h3>{battleResult}</h3>}
    </div>
  );
}

export default Fight;
