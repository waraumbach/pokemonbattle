import { Route, Routes } from 'react-router-dom';
import Pokemon from './components/Pokemon.jsx';
import AllPokemon from './components/AllPokemon.jsx';
import Fight from './components/Fight.jsx';
import App from './App';


const PokemonRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/pokemons" element={<AllPokemon />} />
            <Route path="/:id" element={<Pokemon />} />
            <Route path="/fight" element={<Fight />} />




        </Routes>
    )
}
export default PokemonRouter