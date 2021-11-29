import Dish from '../menu-dishes-collection/dishes-collection.component';
import './dish.min.css'

const Dishes = ({data}) => {
    let dishComp;

    if(data !== undefined) {
        try { dishComp = data.map((_dish, i) => { return <Dish key={i} idDish={i} data={data} id={data[i].idMeal} meal={data[i].strMeal} image={data[i].strMealThumb} pr={'$15.99'}/> }) }
        catch(err) {  }
    }

    return (
        <div className='dishes' >
            {dishComp}
        </div>
    )
}

export default Dishes
