import { Link } from 'react-router-dom'
import './Pokemon.css'


function Pokemon({ name ,image}){
    return (
        <div className="pokemon">
            <Link to={`/pokemon/`}>
            <div className='pokemon-name'>{name}</div>
            <div><img className='pokemon-img' src={image} alt="" /></div>
            </Link>
        </div>
    )
}

export default Pokemon