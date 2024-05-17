import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Pokemon.css";
import { Card } from "@mui/material";

const Pokemon = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({
    sprites: {},
  });
  const [pokemonInfo, setPokemonInfo] = useState({
    abilities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchPokemon();
  }, []);
  const fetchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      console.log(response.data);
      setPokemon(response.data);
      setPokemonInfo(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  console.log(pokemonInfo);

  return (
    // <>
    //   <div className="pokemon-container">
    //     <h1>I am {pokemon.name}</h1>
    //     <img className="pokemon-image" src={pokemon.sprites.front_default} />
    //     <div className="stats-pokemon">
    //       <h3>HP: {pokemonInfo.stats[0].base_stat}</h3>
    //       <h3>Abilities: </h3> <p> {pokemonInfo.abilities[0].ability.name}</p> +
    //       <p> {pokemonInfo.abilities[1].ability.name}</p>
    //       <h3>Moves: </h3> <p> {pokemonInfo.moves[0].move.name}</p> +
    //       <p> {pokemonInfo.moves[20].move.name}</p>
    //       <h3>Stats: </h3>{" "}
    //       <p>
    //         {pokemonInfo.stats[3].base_stat} - {pokemonInfo.stats[3].stat.name}
    //       </p>{" "}
    //       +
    //       <p>
    //         {pokemonInfo.stats[2].base_stat} - {pokemonInfo.stats[2].stat.name}
    //       </p>{" "}
    //       +
    //       <p>
    //         {pokemonInfo.stats[4].base_stat} - {pokemonInfo.stats[4].stat.name}{" "}
    //       </p>
    //     </div>
    //   </div>
    //   <div
    //     style={{
    //       width: "100%",
    //       display: "flex",
    //       justifyContent: "space-between",
    //     }}
    //   >
    //     <button onClick={() => navigate('/pokemons')}>Select a new Pokemon</button>
    //     <Link to="/fight" state={{ pokemonID: pokemonInfo.id }}>
    //       Fight
    //     </Link>
    //   </div>
    // </>



    // <>
    //   <div className="pokemon-container">
    //     <h1>I am {pokemon.name}</h1>
    //     <img className="pokemon-image" src={pokemon.sprites.front_default} />
    //     <div className="stats-pokemon">
    //       <div className="stat">
    //         <span>HP:</span>
    //         <div className="bar hp" style={{ '--hp': pokemonInfo.stats[0].base_stat }}></div>
    //         <span>{pokemonInfo.stats[0].base_stat}</span>
    //       </div>
    //       <div className="stat">
    //         <span>Abilities:</span>
    //         <div className="bar hp" style={{ '--hp': pokemonInfo.abilities[0].ability.name }}></div>
    //         <span>{pokemonInfo.abilities[0].ability.name}</span>
    //       </div>

    //     </div>
    //   </div>
    //   <div className="button-container">
    //     <button onClick={() => navigate('/pokemons')}>Select a new Pokemon</button>
    //     <Link to="/fight" state={{ pokemonID: pokemonInfo.id }}>
    //       Fight
    //     </Link>
    //   </div>
    // </>
    <>
      <Card style={{ width: '500px', border: '20px solid black', borderRadius: '10px' }}>
        <div className="pokemon-container">
          <h1>I am {pokemon.name}</h1>
          <img className="pokemon-image" src={pokemon.sprites.front_default} />
          <div className="stats-pokemon">
            <div className="stat">
              <span>HP:</span>
              <div className="bar hp" style={{ '--hp': pokemonInfo.stats[0].base_stat }}></div>
              <span>{pokemonInfo.stats[0].base_stat}</span>
            </div>
            <div className="stat">
              <span>Abilities:</span>
              <div className="bar ability" style={{ '--ability': pokemonInfo.abilities.length }}></div>
              <span>{pokemonInfo.abilities[0].ability.name}</span>

              {/* , {pokemonInfo.abilities[1]?.ability.name} */}
            </div>
            <div className="stat">
              <span>Moves:</span>
              <div className="bar moves" style={{ '--moves': pokemonInfo.moves.length }}></div>
              <span>{pokemonInfo.moves[0].move.name}</span>

              {/* ,{pokemonInfo.moves[20]?.move.name} */}
            </div>
            {pokemonInfo.stats.slice(1).map((stat, index) => (
              <div key={index} className="stat">
                <span>{stat.stat.name}:</span>
                <div className={`bar stat-${index}`} style={{ [`--stat-${index}`]: stat.base_stat }}></div>
                <span>{stat.base_stat}</span>
              </div>
            ))}
          </div>
        </div>

      </Card>

      <div className="button-container">
        <button onClick={() => navigate('/home')}>Reset</button>
        <button onClick={() => navigate('/pokemons')}>Select a new Pokemon</button>
        <button>
          <Link to="/fight" state={{ pokemonID: pokemonInfo.id }} style={{ textDecoration: 'none', color: 'red' }}>
            Fight
          </Link>
        </button>

      </div>
    </>


  );
};
export default Pokemon;
