import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Pokemon.css";

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
    <>
      <div className="pokemon-container">
        <h1>I am {pokemon.name}</h1>
        <img className="pokemon-image" src={pokemon.sprites.front_default} />
        <div className="stats-pokemon">
          <h3>HP: {pokemonInfo.stats[0].base_stat}</h3>
          <h3>Abilities: </h3> <p> {pokemonInfo.abilities[0].ability.name}</p> +
          <p> {pokemonInfo.abilities[1].ability.name}</p>
          <h3>Moves: </h3> <p> {pokemonInfo.moves[0].move.name}</p> +
          <p> {pokemonInfo.moves[20].move.name}</p>
          <h3>Stats: </h3>{" "}
          <p>
            {pokemonInfo.stats[3].base_stat} - {pokemonInfo.stats[3].stat.name}
          </p>{" "}
          +
          <p>
            {pokemonInfo.stats[2].base_stat} - {pokemonInfo.stats[2].stat.name}
          </p>{" "}
          +
          <p>
            {pokemonInfo.stats[4].base_stat} - {pokemonInfo.stats[4].stat.name}{" "}
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => navigate('/pokemons')}>Select a new Pokemon</button>
        <Link to="/fight" state={{ pokemonID: pokemonInfo.id }}>
          Fight
        </Link>
      </div>
    </>
  );
};
export default Pokemon;
