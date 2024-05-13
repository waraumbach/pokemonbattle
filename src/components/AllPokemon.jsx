import { useState, useEffect } from 'react'
import axios from 'axios'

const AllPokemon = () => {
    const [pokemon1, setPokemon1] = useState([])
    const { error, setError } = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchPokemon1 = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')

            console.log(response.data.results);
            setPokemon1(response.data.results)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchPokemon1()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Error</h1>
    }
    return (
        <div>

            <h1>All Pokemon</h1>
            <ul>
                {pokemon1.map((pokemon, index) => {

                    return (
                        <div key={index}>
                            <li>{pokemon.name}</li>
                            <li>{pokemon.url}</li>
                        </div>
                    )

                })}
            </ul>

        </div>
    )

}
export default AllPokemon