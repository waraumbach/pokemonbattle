// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';




// const Pokemon = () => {
//     const [pokemon, setPokemon] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState(null)

//     const fetchPokemon = async () => {
//         try {

//             const response = await axios.get('https://pokeapi.co/api/v2/pokemon/2/')
//             console.log(response);
//             // console.log(response.data.abilities[0]);
//             setPokemon(response.data)
//         } catch (error) {
//             setError(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         fetchPokemon()
//     }, [])

//     if (loading) {
//         return <h1>Loading...</h1>
//     }

//     if (error) {
//         return <h1>Error</h1>
//     }

//     return (
//         <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea>
//                 <CardMedia
//                     component="img"
//                     height="140"
//                     image={pokemon.sprites.front_default && pokemon.sprites.front_default}
//                     alt="green iguana"
//                 />
//                 <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                         Lizard
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">

//                     </Typography>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//     )
// }

// export default Pokemon

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'


const Pokemon = () => {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState({

        sprites: {},
    })
    const [pokemonInfo, setPokemonInfo] = useState({
        abilities: []

    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetchPokemon()
    }, [])
    const fetchPokemon = async () => {

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            console.log(response.data);
            setPokemon(response.data)
            setPokemonInfo(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>Error</h1>
    }
    console.log(pokemonInfo);

    return (
        <div style={{ textAlign: 'center' }}>

            <p>I am {pokemon.name}</p>
            <img style={{ width: '500px', height: '500px', border: '5px solid green' }} src={pokemon.sprites.front_default} />
            <p>{pokemonInfo.abilities[0].ability.name}</p>
            <p>{pokemonInfo.abilities[1].ability.name}</p>

        </div>
    )
}
export default Pokemon