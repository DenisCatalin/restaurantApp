import {Link, useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import useResize from '../../customStates/useResize'
import Dishes from './Dishes'
import './menu.min.css'

const Menu = () => {

    const [search, setSearch] = useState('');
    const [dishData, setDishData] = useState();
    const [toggleMenu, setToggleMenu] = useState(false);
    const { height, width } = useResize();
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const history = useHistory();
    

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    const text = localStorage.getItem('foodCategory');

    useEffect(() => {
        if(localStorage.getItem("foodCategory") === null) {
            (async function getDishes() {
                const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`);
                const data = await res.json();
                if(data !== undefined) setDishData(data.meals);
            }());
        } else {
            history.push(`/menu/${text}`);
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
        <div className='landing-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="header-menu" style={{background: darkmode ? '#252525' : '#EEE', borderBottom: darkmode ? '1px solid #EEE' : '1px solid #AAA'}}>
                <div className="back-to-home"><Link to='/' className="fas fa-arrow-left" style={{color: darkmode ? '#fff' : '#252525'}}></Link></div>
                <ul className="menu-categories">
                    <li className={text === 'Chicken' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Chicken</li>
                    <li className={text === 'Beef' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Beef</li>
                    <li className={text === 'Miscellaneous' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Miscellaneous</li>
                    <li className={text === 'Side' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Side</li>
                    <li className={text === 'Breakfast' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Breakfast</li>
                    <li className={text === 'Pork' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Pork</li>
                    <li className={text === 'Pasta' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Pasta</li>
                    <li className={text === 'Seafood' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Seafood</li>
                    <li className={text === 'Dessert' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Dessert</li>
                    <li className={text === 'Vegan' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Vegan</li>
                    <li className={text === 'Vegetarian' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Vegetarian</li>
                    <li className={text === 'Lamb' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Lamb</li>
                    <li className={text === 'Goat' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Goat</li>
                    <li className={text === 'Starter' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Starter</li>
                </ul>
                
                <div className="header-menu-profile">
                    <Link to='/cart' className='header-cart' style={{background: darkmode ? '#FF9900' : '#171717', color: darkmode ? '#252525' : '#fff'}}><i className="fas fa-shopping-cart"></i></Link>
                    <div className="categories-responsive" style={{ opacity: toggleMenu ? '1' : '0', pointerEvents: toggleMenu ? 'all' : 'none' }}>
                        <ul className="menu-categories-responsivee" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                            <li className={text === 'Chicken' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Chicken</li>
                            <li className={text === 'Beef' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Beef</li>
                            <li className={text === 'Miscellaneous' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Miscellaneous</li>
                            <li className={text === 'Side' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Side</li>
                            <li className={text === 'Breakfast' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Breakfast</li>
                            <li className={text === 'Pork' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Pork</li>
                            <li className={text === 'Pasta' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Pasta</li>
                            <li className={text === 'Seafood' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Seafood</li>
                            <li className={text === 'Dessert' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Dessert</li>
                            <li className={text === 'Vegan' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Vegan</li>
                            <li className={text === 'Vegetarian' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Vegetarian</li>
                            <li className={text === 'Lamb' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Lamb</li>
                            <li className={text === 'Goat' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Goat</li>
                            <li className={text === 'Starter' ? 'menu-category active' : 'menu-category'} style={{color: darkmode ? '#fff' : '#252525'}} onClick={categClick}>Starter</li>
                        </ul> 
                    </div>
                </div>
                <button className="menu-categories-responsive" onClick={() => setToggleMenu(!toggleMenu)} style={{textShadow: toggleMenu ? '2px 3px  #ff990085' : 'none', color: darkmode ? '#fff' : '#000'}}><i className="fas fa-ellipsis-h"></i></button>
            </div>
            <div className="menu-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <Dishes data={dishData}/>
            </div>
        </div>
    )
}

export default Menu
