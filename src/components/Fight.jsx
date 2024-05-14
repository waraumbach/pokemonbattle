import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Fight() {
    const [pokemonList, setPokemonList] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [enemyPokemon, setEnemyPokemon] = useState(null);
    const [battleResult, setBattleResult] = useState('');

    // Fetching list of Pokemon from API
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon')
            .then(response => {
                setPokemonList(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching Pokemon:', error);
            });
    }, []);

    // Function to select a random Pokemon from the list
    const selectRandomPokemon = () => {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        setSelectedPokemon(pokemonList[randomIndex]);
    };

    // Function to start a battle with a randomly selected enemy Pokemon
    const startBattle = () => {
        selectRandomPokemon();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${Math.ceil(Math.random() * 15)}`)
            .then(response => {
                setEnemyPokemon(response.data);
                // Simulate battle result (for demonstration purposes)
                const result = Math.random() < 0.5 ? 'You win!' : 'You lose!';
                setBattleResult(result);
            })
            .catch(error => {
                console.error('Error fetching enemy Pokemon:', error);
            });
    };

    return (
        <div>
            <h1>Pokemon Game</h1>
            <button onClick={startBattle}>Start Battle</button>
            {selectedPokemon && (
                <div>
                    <h2>Your Pokemon: {selectedPokemon.name}</h2>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.url.split('/')[6]}.png`} alt={selectedPokemon.name} />
                </div>
            )}
            {enemyPokemon && (
                <div>
                    <h2>Enemy Pokemon: {enemyPokemon.name}</h2>
                    <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name} />
                </div>
            )}
            {battleResult && <h3>{battleResult}</h3>}
        </div>
    );
}

export default Fight;