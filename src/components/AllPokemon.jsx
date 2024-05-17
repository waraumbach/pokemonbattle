import { useState, useEffect } from "react";
import axios, { all } from "axios";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";



const AllPokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const { error, setError } = useState(null);
  const [loading, setLoading] = useState(false);
  let Navigate = useNavigate();

  const fetchAllPokemon = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      console.log(response.data.results);
      setAllPokemon(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <h1>All Pokemon</h1>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {allPokemon.map((allPokemon, index) => {
          return (
            <Card style={{ width: '150px', backgroundColor: 'black', margin: '8px' }}>
              <li
                style={{
                  padding: "15px",
                  border: "4px solid #0072BB",
                  margin: "10px",
                }}
                key={index}
              >
                <Link to={`/${index + 1}`}>{allPokemon.name}
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`} alt={allPokemon.name} />

                </Link>
              </li>
            </Card>
          );
        })}
      </ul>
      <button onClick={() => Navigate('/home')}>Reset</button>
    </div>

  );
};
export default AllPokemon;
