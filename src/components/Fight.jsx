// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// function Fight() {
//   let { state } = useLocation();
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const [randomPokemon, setRandomPokemon] = useState(null);
//   const [selectedPokemonHP, setSelectedPokemonHP] = useState(0);
//   const [randomPokemonHP, setRandomPokemonHP] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [battleStarted, setBattleStarted] = useState(false);
//   const [battleMessage, setBattleMessage] = useState('');
//   const [battleOver, setBattleOver] = useState(false);
//   let navigate = useNavigate();

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
//     setBattleOver(false);
//   }

//   const attack = (attacker, defender, setDefenderHP, counterAttack = false) => {
//     const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
//     setBattleMessage(`${attacker} does ${damage} damage!`);
//     setDefenderHP(defender - damage);
//     if (defender - damage <= 0) {
//       setBattleMessage(`${attacker} wins!`);
//       setBattleStarted(false);
//       setBattleOver(true);
//     } else if (!counterAttack && !battleOver) {
//       // If this is not a counter-attack and the battle is not over, schedule a counter-attack in 3 seconds
//       setTimeout(() => attack(randomPokemon.name, selectedPokemonHP, setSelectedPokemonHP, true), 3000);
//     }
//   }

//   // const refillStrength = (pokemon, setPokemonHP) => {
//   //   setPokemonHP(prevHP => prevHP + 20);
//   // }

//   const refillStrength = (pokemon, setPokemonHP, opponentHP, setOpponentHP) => {
//     setPokemonHP(prevHP => {
//       if (prevHP > opponentHP) {
//         setOpponentHP(prevOpponentHP => prevOpponentHP + 20);
//         return prevHP + 20;
//       }
//       return prevHP;
//     });
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

//         {!battleStarted && <button onClick={startBattle}>Start Battle</button>}
//         {battleStarted && (
//           <div className="buttons">
//             <button onClick={() => attack(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Attack</button>
//             {/* <button onClick={() => refillStrength(selectedPokemon.name, setSelectedPokemonHP)}>Refill Strength</button> */}
//             <button onClick={() => refillStrength(selectedPokemon.name, setSelectedPokemonHP, randomPokemonHP, setRandomPokemonHP)}>Refill Strength</button>
//             <button onClick={() => attack(randomPokemon.name, selectedPokemonHP, setSelectedPokemonHP)}>Counter Attack</button>
//           </div>
//         )}

//         <div style={{ display: 'flex' }}>

//           {/* {selectedPokemon && (
//             <div>
//               <h2>Your Pokemon: {selectedPokemon.name} (HP: {selectedPokemonHP})</h2>
//               <img className="pokemon-image"
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
//                 alt={selectedPokemon.name}
//               />
//             </div>
//           )}
//           <h2>VS</h2>
//           {randomPokemon && (
//             <div>
//               <h2>Opponent's Pokemon: {randomPokemon.name} (HP: {randomPokemonHP})</h2>
//               <img className="pokemon-image"
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png`}
//                 alt={randomPokemon.name}
//               />
//             </div>
//           )} */}

//           {selectedPokemon && (
//             <div>
//               <h2>Your Pokemon: {selectedPokemon.name}</h2>
//               <div className="hp-bar">
//                 <div className={`hp-bar-inner ${selectedPokemonHP <= 50 ? 'low' : ''} ${selectedPokemonHP <= 20 ? 'critical' : ''}`} style={{ width: `${selectedPokemonHP}%` }}></div>
//               </div>
//               <img className="pokemon-image"
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
//                 alt={selectedPokemon.name}
//               />
//             </div>
//           )}
//           <h2>VS</h2>
//           {randomPokemon && (
//             <div>
//               <h2>Opponent's Pokemon: {randomPokemon.name}</h2>
//               <div className="hp-bar">
//                 <div className={`hp-bar-inner ${randomPokemonHP <= 50 ? 'low' : ''} ${randomPokemonHP <= 20 ? 'critical' : ''}`} style={{ width: `${randomPokemonHP}%` }}></div>
//               </div>
//               <img className="pokemon-image"
//                 src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png`}
//                 alt={randomPokemon.name}
//               />
//             </div>
//           )}
//         </div>
//         <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>{battleMessage}</p>
//       </div>
//       <button style={{ marginTop: '20px', padding: '10px' }} onClick={() => navigate('/pokemons')}>Select another Pokemon</button>
//     </>
//   );
// }

// export default Fight;

import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./Pokemon.css";
import { red } from "@mui/material/colors";

function Fight() {
  let { state } = useLocation();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [randomPokemon, setRandomPokemon] = useState(null);
  const [selectedPokemonHP, setSelectedPokemonHP] = useState(0);
  const [randomPokemonHP, setRandomPokemonHP] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleMessage, setBattleMessage] = useState("");
  const [battleOver, setBattleOver] = useState(false);
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
        `https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 150) + 1
        }`
      );
      setRandomPokemon(response.data);
      setRandomPokemonHP(response.data.stats[0].base_stat);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const startBattle = () => {
    setBattleStarted(true);
    setBattleOver(false);
  };

  const attackScratch = (
    attacker,
    defender,
    setDefenderHP,
    counterAttack = false
  ) => {
    const damage = Math.floor(Math.random() * 10) + 1; // Random damage between 1 and 10
    performAttack(attacker, defender, setDefenderHP, counterAttack, damage);
  };

  const attackGrowl = (
    attacker,
    defender,
    setDefenderHP,
    counterAttack = false
  ) => {
    const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
    performAttack(attacker, defender, setDefenderHP, counterAttack, damage);
  };

  const attackEmber = (
    attacker,
    defender,
    setDefenderHP,
    counterAttack = false
  ) => {
    const damage = Math.floor(Math.random() * 30) + 1; // Random damage between 1 and 30
    performAttack(attacker, defender, setDefenderHP, counterAttack, damage);
  };

  const attackOther = (
    attacker,
    defender,
    setDefenderHP,
    counterAttack = false
  ) => {
    const damage = Math.floor(Math.random() * 40) + 1; // Random damage between 1 and 40
    performAttack(attacker, defender, setDefenderHP, counterAttack, damage);
  };

  const performAttack = (
    attacker,
    defender,
    setDefenderHP,
    counterAttack,
    damage
  ) => {
    setBattleMessage(`${attacker} does ${damage} damage!`);
    setDefenderHP(defender - damage);
    if (defender - damage <= 0) {
      setBattleMessage(`${attacker} wins!`);
      setBattleStarted(false);
      setBattleOver(true);
    } else if (!counterAttack && !battleOver) {
      setTimeout(
        () =>
          attackScratch(
            randomPokemon.name,
            selectedPokemonHP,
            setSelectedPokemonHP,
            true
          ),
        3000
      );
    }
  };

  const refillStrength = (pokemon, setPokemonHP, opponentHP, setOpponentHP) => {
    setPokemonHP((prevHP) => {
      if (prevHP > opponentHP) {
        setOpponentHP((prevOpponentHP) => prevOpponentHP + 20);
        return prevHP + 20;
      }
      return prevHP;
    });
  };

  useEffect(() => {
    fetchPokemon();
    fetchRandomPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {/* <Card>
        <div>
          <h1>Pokemon Game</h1>

          {!battleStarted && <button onClick={startBattle}>Start Battle</button>}
          {battleStarted && (
            <div className="buttons">
              <button onClick={() => attackScratch(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Scratch</button>
              <button onClick={() => attackGrowl(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Growl</button>
              <button onClick={() => attackEmber(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Ember</button>
              <button onClick={() => attackOther(selectedPokemon.name, randomPokemonHP, setRandomPokemonHP)}>Other</button>
              <button onClick={() => refillStrength(selectedPokemon.name, setSelectedPokemonHP, randomPokemonHP, setRandomPokemonHP)}>Refill Strength</button>
            </div>
          )}

          <div style={{ display: 'flex' }}>
            {selectedPokemon && (
              <div>
                <h2>Your Pokemon: {selectedPokemon.name}</h2>
                <div className="hp-bar">
                  <div className={`hp-bar-inner ${selectedPokemonHP <= 50 ? 'low' : ''} ${selectedPokemonHP <= 20 ? 'critical' : ''}`} style={{ width: `${selectedPokemonHP}%` }}></div>
                </div>
                <img className="pokemon-image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                  alt={selectedPokemon.name}
                />
              </div>
            )}
            <h2>VS</h2>
            {randomPokemon && (
              <div>
                <h2>Opponent's Pokemon: {randomPokemon.name}</h2>
                <div className="hp-bar">
                  <div className={`hp-bar-inner ${randomPokemonHP <= 50 ? 'low' : ''} ${randomPokemonHP <= 20 ? 'critical' : ''}`} style={{ width: `${randomPokemonHP}%` }}></div>
                </div>
                <img className="pokemon-image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png`}
                  alt={randomPokemon.name}
                />
              </div>
            )}
          </div>
          <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>{battleMessage}</p>
        </div>
        <button style={{ marginTop: '20px', padding: '10px' }} onClick={() => navigate('/pokemons')}>Select another Pokemon</button>
      </Card> */}
      <Card>
        <div style={{ border: "15px solid black", borderRadius: "5px" }}>
          <h1>Pokemon Game</h1>

          {!battleStarted && (
            <button onClick={startBattle}>Start Battle</button>
          )}

          <div style={{ display: "flex" }}>
            {selectedPokemon && (
              <div>
                <h2>Your Pokemon: {selectedPokemon.name}</h2>
                <div className="hp-bar" style={{ marginLeft: "40px", marginRight: "3.1px" }}>
                  <div
                    className={`hp-bar-inner ${selectedPokemonHP <= 50 ? "low" : ""
                      } ${selectedPokemonHP <= 20 ? "critical" : ""}`}
                    style={{ width: `${selectedPokemonHP}%` }}
                  ></div>
                </div>
                <img
                  className="pokemon-image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`}
                  alt={selectedPokemon.name}
                />
                {battleStarted && (


                  <div style={{ display: "flex", flexDirection: "row" }} className="buttons">
                    <button style={{ backgroundColor: "red", color: "black" }}
                      onClick={() =>
                        attackScratch(
                          selectedPokemon.name,
                          randomPokemonHP,
                          setRandomPokemonHP
                        )
                      }
                    >
                      Scratch
                    </button>
                    <button style={{ backgroundColor: "lightgreen", color: "black" }}
                      onClick={() =>
                        attackGrowl(
                          selectedPokemon.name,
                          randomPokemonHP,
                          setRandomPokemonHP
                        )
                      }
                    >
                      Growl
                    </button>
                    <button style={{ backgroundColor: "yellow", color: "black" }}
                      onClick={() =>
                        attackEmber(
                          selectedPokemon.name,
                          randomPokemonHP,
                          setRandomPokemonHP
                        )
                      }
                    >
                      Ember
                    </button>
                    <button style={{ backgroundColor: "orange", color: "black" }}
                      onClick={() =>
                        refillStrength(
                          selectedPokemon.name,
                          setSelectedPokemonHP,
                          randomPokemonHP,
                          setRandomPokemonHP
                        )
                      }
                    >
                      Refill Strength
                    </button>
                  </div>
                )}
              </div>
            )}

            {randomPokemon && (
              <div>
                <h2>Opponent's Pokemon: {randomPokemon.name}</h2>
                <div className="hp-bar">
                  <div
                    className={`hp-bar-inner ${randomPokemonHP <= 50 ? "low" : ""
                      } ${randomPokemonHP <= 20 ? "critical" : ""}`}
                    style={{
                      width: `${randomPokemonHP}%`,
                      // border: "3px solid black",
                      // borderRadius: "12px",
                    }}
                  ></div>
                </div>

                <img
                  className="pokemon-image"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon.id}.png`}
                  alt={randomPokemon.name}
                />
                {battleStarted && (
                  <div
                    style={{ display: "flex", flexDirection: "right-row", color: "red" }}
                    className="buttons">
                    <button style={{ backgroundColor: "red", color: "black" }}
                      onClick={() =>
                        attackScratch(
                          randomPokemon.name,
                          selectedPokemonHP,
                          setSelectedPokemonHP
                        )
                      }
                    >
                      Scratch
                    </button>
                    <button style={{ backgroundColor: "lightgreen", color: "black" }}
                      onClick={() =>
                        attackGrowl(
                          randomPokemon.name,
                          selectedPokemonHP,
                          setSelectedPokemonHP
                        )
                      }
                    >
                      Growl
                    </button>


                    <button style={{ backgroundColor: "yellow", color: "black" }}
                      onClick={() =>
                        attackEmber(
                          randomPokemon.name,
                          selectedPokemonHP,
                          setSelectedPokemonHP
                        )
                      }
                    >
                      Ember
                    </button>
                    <button style={{ backgroundColor: "orange", color: "black" }}
                      onClick={() =>
                        refillStrength(
                          randomPokemon.name,
                          setRandomPokemonHP,
                          selectedPokemonHP,
                          setSelectedPokemonHP
                        )
                      }
                    >
                      Refill Strength
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
      <button
        style={{ marginTop: "20px", padding: "10px" }}
        onClick={() => navigate("/pokemons")}
      >
        Select another Pokemon
      </button>
    </>
  );
}

export default Fight;
