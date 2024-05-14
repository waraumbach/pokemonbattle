import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <div
        style={{
          textAlign: "center",
          border: " 15px solid #F44E3F",
          marginBottom: "50px",
          width: "100%",
        }}
      >
        <p>I am {pokemon.name}</p>
        <img
          style={{
            width: "500px",
            height: "500px",
            border: "5px solid green",
          }}
          src={pokemon.sprites.front_default}
        />

        <p>Abilities: {pokemonInfo.abilities[0].ability.name}</p>
        <p>Abilities:{pokemonInfo.abilities[1].ability.name}</p>
        <p>Moves: {pokemonInfo.moves[0].move.name}</p>
        <p>Moves: {pokemonInfo.moves[20].move.name}</p>
        <p>Hp: {pokemonInfo.stats[0].base_stat}</p>
        <p>
          Stats: {pokemonInfo.stats[3].base_stat} -{" "}
          {pokemonInfo.stats[3].stat.name}
        </p>
        <p>
          Stats: {pokemonInfo.stats[4].base_stat} -{" "}
          {pokemonInfo.stats[4].stat.name}
        </p>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button>Select a new Pokemon</button>
        <Link to="/fight" state={{ pokemonID: pokemonInfo.id }}>
          Fight
        </Link>
      </div>
    </>
  );
};
export default Pokemon;
