

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function Fight() {
//   let { state } = useLocation();
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const [randomPokemon, setRandomPokemon] = useState(null);
//   const [selectedPokemonHP, setSelectedPokemonHP] = useState(0);
//   const [randomPokemonHP, setRandomPokemonHP] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [battleStarted, setBattleStarted] = useState(false);

//   const fetchPokemon = async () => {
//     try {
//       if (state) {
//         const response = await axios.get(
//           `https://pokeapi.co/api/v2/pokemon/${state.pokemonID}`
//         );
//         setSelectedPokemon(response.data);
//         setSelectedPokemonHP(response.data.stats[0].base_stat);
//       }
//     } catch (error) {
//       console.error("Error fetching Pokemon:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRandomPokemon = async () => {
//     try {
//       const response = await axios.get(
//         `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 150) + 1}`
//       );
//       setRandomPokemon(response.data);
//       setRandomPokemonHP(response.data.stats[0].base_stat);
//     } catch (error) {
//       console.error("Error fetching Pokemon:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const startBattle = () => {
//     setBattleStarted(true);
//   }

//   const attack = (attacker, defender, setDefenderHP) => {
//     const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
//     alert(`${attacker} does ${damage} damage!`);
//     setDefenderHP(defender - damage);
//     if (defender - damage <= 0) {
//       alert(`${attacker} wins!`);
//       setBattleStarted(false);
//     }
//   }

//   useEffect(() => {
//     fetchPokemon();
//     fetchRandomPokemon();
//   }, []);

//   if (loading) return <p>Loading...</p>
//   if (error) return <p>Error</p>

//   return (
//     <>
//       <div>
//         <h1>Pokemon Game</h1>

//         <button onClick={startBattle} disabled={battleStarted} >Start Battle</button>
//         {battleStarted && (
//           <>
//             <button onClick={() => attack(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Attack</button>
//             <button onClick={() => attack(randomPokemon.name, selectedPokemonHP, setSelectedPokemonHP)}>Counter Attack</button>
//           </>
//         )}
//         <div style={{ display: 'flex' }}>
//           {selectedPokemon && (
//             <div>
//               <h2>Your Pokemon: {selectedPokemon.name} (HP: {selectedPokemonHP})</h2>
//               <img
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
//                 alt={selectedPokemon.name}
//               />
//             </div>
//           )}
//           <h2>VS</h2>
//           {randomPokemon && (
//             <div>
//               <h2>Opponent's Pokemon: {randomPokemon.name} (HP: {randomPokemonHP})</h2>
//               <img
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png`}
//                 alt={randomPokemon.name}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Fight;

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Fight() {
  let { state } = useLocation();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [selectedPokemonHP, setSelectedPokemonHP] = useState(0);
  const [randomPokemonHP, setRandomPokemonHP] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [battleStarted, setBattleStarted] = useState(false);

  let navigate = useNavigate();

  const fetchPokemon = async () => {
    try {
      if (state) {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${state.pokemonID}`
        );
        setSelectedPokemon(response.data);
        setSelectedPokemonHP(response.data.stats[0].base_stat);
      }
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 150) + 1}`
      );
      setRandomPokemon(response.data);
      setRandomPokemonHP(response.data.stats[0].base_stat);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  }

  const startBattle = () => {
    setBattleStarted(true);
  }

  const attack = (attacker, defender, setDefenderHP) => {
    const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
    alert(`${attacker} does ${damage} damage!`);
    setDefenderHP(defender - damage);
    if (defender - damage <= 0) {
      alert(`${attacker} wins!`);
      setBattleStarted(false);
    }
  }

  const refillStrength = (pokemon, setPokemonHP) => {
    setPokemonHP(prevHP => prevHP + 20);
  }

  useEffect(() => {
    fetchPokemon();
    fetchRandomPokemon();
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <>
      <div>
        <h1>Pokemon Game</h1>

        {!battleStarted && <button onClick={startBattle}>Start Battle</button>}
        {battleStarted && (
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <button onClick={() => attack(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Attack</button>
            <button onClick={() => refillStrength(selectedPokemon.name, setSelectedPokemonHP)}>Refill Strength</button>
            <button onClick={() => attack(randomPokemon.name, selectedPokemonHP, setSelectedPokemonHP)}>Counter Attack</button>

          </div>
        )}
        <div style={{ display: 'flex' }}>
          {selectedPokemon && (
            <div>
              <h2>Your Pokemon: {selectedPokemon.name} (HP: {selectedPokemonHP})</h2>
              <img className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                alt={selectedPokemon.name}
              />
            </div>
          )}
          <h2>VS</h2>
          {randomPokemon && (
            <div>
              <h2>Opponent's Pokemon: {randomPokemon.name} (HP: {randomPokemonHP})</h2>
              <img className="pokemon-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png`}
                alt={randomPokemon.name}
              />
            </div>
          )}
        </div>
      </div>
      <button onClick={() => navigate('/pokemons')}>Use another Pokemon</button>
    </>
  );
}

export default Fight;