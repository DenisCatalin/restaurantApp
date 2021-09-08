import image from './img/profile.png'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import useResize from './useResize'
import Dishes from './Dishes'
import './css/menu.min.css'

const Menu = () => {
    
    const [search, setSearch] = useState('');
    const [dishData, setDishData] = useState();
    const [toggleMenu, setToggleMenu] = useState(false);
    const { height, width } = useResize();

    const text = localStorage.getItem('foodCategory');

    useEffect(() => {
        if(localStorage.getItem("foodCategory") === null) {
            (async function getDishes() {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`);
                const data = await res.json();
                if(data !== undefined) setDishData(data.meals);
            }());
        } else {
            (async function getDishes2() {
                const meal = localStorage.getItem('foodCategory');
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`);
                const data = await res.json();
                if(data !== undefined) setDishData(data.meals);
            }());
        }    
    }, [search]);

    useEffect(() => {
        if(width > 1400) setToggleMenu(false);
    }, [height, width]);

    const categClick = (e) => {
        setSearch(e.target.textContent); 
        localStorage.removeItem('foodCategory');
        localStorage.setItem('foodCategory', e.target.textContent);

        if(toggleMenu) setToggleMenu(!toggleMenu);
    }

    return (
        <div className='landing-page'>
            <div className="header-menu">
                <div className="back-to-home"><Link to='/' className="fas fa-arrow-left"></Link></div>
                <ul className="menu-categories">
                    <li className={text === 'Chicken' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Chicken</li>
                    <li className={text === 'Beef' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Beef</li>
                    <li className={text === 'Miscellaneous' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Miscellaneous</li>
                    <li className={text === 'Side' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Side</li>
                    <li className={text === 'Breakfast' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Breakfast</li>
                    <li className={text === 'Pork' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Pork</li>
                    <li className={text === 'Pasta' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Pasta</li>
                    <li className={text === 'Seafood' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Seafood</li>
                    <li className={text === 'Dessert' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Dessert</li>
                    <li className={text === 'Vegan' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Vegan</li>
                    <li className={text === 'Vegetarian' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Vegetarian</li>
                    <li className={text === 'Lamb' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Lamb</li>
                    <li className={text === 'Goat' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Goat</li>
                    <li className={text === 'Starter' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Starter</li>
                </ul>
                
                <div className="header-menu-profile">
                    <img src={image} alt="" className='menu-header-image' />
                    <h3 className="header-menu-name">Denis Catalin</h3>
                    <div className="categories-responsive" style={{ opacity: toggleMenu ? '1' : '0', pointerEvents: toggleMenu ? 'all' : 'none' }}>
                        <ul className="menu-categories-responsivee">
                            <li className={text === 'Chicken' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Chicken</li>
                            <li className={text === 'Beef' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Beef</li>
                            <li className={text === 'Miscellaneous' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Miscellaneous</li>
                            <li className={text === 'Side' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Side</li>
                            <li className={text === 'Breakfast' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Breakfast</li>
                            <li className={text === 'Pork' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Pork</li>
                            <li className={text === 'Pasta' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Pasta</li>
                            <li className={text === 'Seafood' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Seafood</li>
                            <li className={text === 'Dessert' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Dessert</li>
                            <li className={text === 'Vegan' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Vegan</li>
                            <li className={text === 'Vegetarian' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Vegetarian</li>
                            <li className={text === 'Lamb' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Lamb</li>
                            <li className={text === 'Goat' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Goat</li>
                            <li className={text === 'Starter' ? 'menu-category active' : 'menu-category'} onClick={categClick}>Starter</li>
                        </ul> 
                    </div>
                </div>
                <button className="menu-categories-responsive" onClick={() => setToggleMenu(!toggleMenu)} style={{textShadow: toggleMenu ? '2px 3px  #ff990085' : 'none'}}><i className="fas fa-ellipsis-h"></i></button>
            </div>
            <div className="menu-container">
                <Dishes data={dishData}/>
            </div>
        </div>
    )
}

export default Menu
