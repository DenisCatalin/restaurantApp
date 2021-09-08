import Dish from './Dish';
import './css/dish.min.css'

const Dishes = ({data}) => {
    let dishComp;

    if(data !== undefined) {
        try { dishComp = data.map((_dish, i) => { return <Dish key={i} id={data[i].idMeal} meal={data[i].strMeal} image={data[i].strMealThumb}/> }) }
        catch(err) { console.log('NULL'); }
    }

    return (
        <div className='dishes' >
            {dishComp}
        </div>
    )
}

export default Dishes
