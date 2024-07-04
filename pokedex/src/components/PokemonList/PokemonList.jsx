import { useEffect, useState} from "react"
import './pokemonList.css'
import axios from 'axios'
import Pokemon from "../pokemon/Pokemon";

function PokemonList(){

    const [PokemonList, setpokemonList]=useState([]);
    const [isLoading,setLoading] = useState(true)

    const [pokedexUrl,setpokedexUrl]=useState(`https://pokeapi.co/api/v2/pokemon`)

    const [nextUrl,setnextUrl]=useState('')
    const [prevUrl,setPrevUrl]=useState('')
    
    async function downloadPokemons(){
      setLoading(true);
        const response= await axios.get(pokedexUrl);
       const pokemonResults=response.data.results;
       console.log(response.data)
      const pokemonResultPromise= pokemonResults.map((pokemon)=>axios.get(pokemon.url))
    //   console.log(pokemonResultPromise)
      const pokemonData=await axios.all( pokemonResultPromise)

      console.log(pokemonData);
      setnextUrl(response.data.next)
      setPrevUrl(response.data.previous)

      const res=pokemonData.map((pokeData)=>{
        const pokemon= pokeData.data;
        return {
            id:pokemon.id,
            name: pokemon.name,
            image:pokemon.sprites.other.dream_world.front_default,
            types:pokemon
        
        }
      });
      console.log(res)
      setpokemonList(res)

        setLoading(false)
    }

    useEffect( ()=>{
        downloadPokemons();
    },[pokedexUrl])

    return(
        
        <div className="pockemon-list-wrapper">
          {/* <div>Pokemon List</div> */}
          <div className="pockemon-wrapper">
          {(isLoading)?'Loading....':
           PokemonList.map((p)=> <Pokemon name ={p.name} image={p.image} key={p.id} id={p.id} />)
          }
          </div>
          <div className="controls">
            <button disabled={prevUrl==null} onClick={()=>setpokedexUrl(prevUrl)}>Prev</button>
            <button disabled={nextUrl==null} onClick={()=>setpokedexUrl(nextUrl)}>Next</button>
          </div>
        </div>
    )
    
}

export default PokemonList