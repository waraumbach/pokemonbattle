import { useNavigate } from "react-router-dom";
import "./App.css";
// import Fight from "./components/Fight";
// import { useState } from "react";
import pokemonLogo from "./assets/pokemonLogo.svg";

function App() {
  let navigate = useNavigate();

  return (
    <>
      <div>
        <img
          src={pokemonLogo}
          alt=""
          style={{ width: "500px", height: "400px", margin: "0" }}
        />
        <h1>Battle it out !</h1>
        <button onClick={() => navigate("/pokemons")}>Select a Pokemon</button>
      </div>
    </>
  );
}

export default App;
