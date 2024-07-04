import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

function PokemonDetails(){
    const {id}=useParams();
    const [pokemon,setpokemon]=useState({})

    async function downloadPokemons(){
        const response= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data)

         setpokemon({
            name:response.data.name,
            image:response.data.sprites.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name)

        })
    }

    useEffect(()=>{
        downloadPokemons();
    },[]);
    return(

        <div className="pokemon-details-wrapper">
            <div className="pokemon-name">name:{pokemon.name}</div>
            <img className="pokemon-image" src={pokemon.image} alt="image" />
            <div>Height:{pokemon.height}</div>
            <div>weight:{pokemon.weight}</div>
            <div className="pokemon-types">
               {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
            </div>
        </div>
    )
}

export default PokemonDetails