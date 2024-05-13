import { Route, Routes } from 'react-router-dom';
import Pokemon from './components/Pokemon';
import AllPokemon from './components/AllPokemon';
import App from './App';


const PokemonRouter = () => {
    return (
        <Routes>
            <Route path="/pokemons" element={<AllPokemon />} />
            <Route path="/:id" element={<Pokemon />} />
            <Route path="/" element={<App />} />

        </Routes>
    )
}
export default PokemonRouter