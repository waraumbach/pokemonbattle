import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Fight() {
  let { state } = useLocation();
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching list of Pokemon from API

  const fetchPokemon = async () => {
    try {
      if (state) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${state.pokemonID}`
        );
        console.log(response)
        setSelectedPokemon(response.data);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) return <p>Loading...</p>
  const fetchRandomPokemon = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const randomPokemon = response.data.results[Math.floor(Math.random() * 150)];
    return randomPokemon;
  }
  const fetchPokemonDetails = async (pokemonName) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
  }
  const simulateFight = (myPokemon, opponentPokemon) => {
    const myPokemonAttack = myPokemon.stats[0].base_stat;
    const opponentPokemonAttack = opponentPokemon.stats[0].base_stat;

    if (myPokemonAttack > opponentPokemonAttack) {
      return `${myPokemon.name} wins!`;
    } else if (opponentPokemonAttack > myPokemonAttack) {
      return `${opponentPokemon.name} wins!`;
    } else {
      return "It's a tie!";
    }
  }





  // const randomPokemon = () => {
  //   const randomIndex = Math.floor(Math.random() * pokemonList.length);
  //   setSelectedPokemon(pokemonList[randomIndex]);

  // };

  // const startBattle = async () => {
  //   try {
  //     const responseOpponent = await axios.get(
  //       `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 151)}}`
  //     )
  //     console.log(responseOpponent);
  //   }catch (error)

  // }



  return (
    <>
      <div>
        <h1>Pokemon Game</h1>

        <button>Start Battle</button>
        {selectedPokemon && (
          <div>
            <h2>Your Pokemon: {selectedPokemon.name}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
              alt={selectedPokemon.name}
            />
          </div>

        )}
        <div>
          <h2>Enemy Pokemon</h2>

        </div>

      </div>
    </>
  );
}

export default Fight;
