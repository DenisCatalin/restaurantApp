import {useState, useEffect} from 'react'
import './css/modal.min.css'

const Modal = () => {
    const [modalData, setModalData] = useState({});

    const mealID = JSON.parse(localStorage.getItem('ingredient'));

    useEffect(() => {
        (async function getIngredients() {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
            const data = await res.json();
            setModalData(data.meals[0]);
            console.log(data.meals[0]);
        }());
        return;
    }, [mealID]);

    return (
        <div className='modal-container'>
            <div className="modal">
                <img src={modalData.strMealThumb} alt="" className='modal-image'/>
                <div className="modal-details">
                    <div className="modal-detail">
                        <h1>Dish name </h1>
                        <h1>{modalData.strMeal}</h1>
                    </div>
                    <div className="modal-detail">
                        <h1>Originality</h1>
                        <h1>{modalData.strArea}</h1>
                    </div>
                    <div className="modal-detail">
                        <h1>Dish Category</h1>
                        <h1>{modalData.strCategory}</h1>
                    </div>    
                </div>
                <div className="ingredients">
                    <div className="ingredients-modal">
                        <h1>INGREDIENTS</h1>
                    </div>
                    <div className="meal-ingredients">
                        <h1>{modalData.strIngredient1}</h1>
                        <h1>{modalData.strIngredient2}</h1>
                        <h1>{modalData.strIngredient3}</h1>
                        <h1>{modalData.strIngredient4}</h1>
                        <h1>{modalData.strIngredient5}</h1>
                        <h1>{modalData.strIngredient6}</h1>
                        <h1>{modalData.strIngredient7}</h1>
                        <h1>{modalData.strIngredient8}</h1>
                        <h1>{modalData.strIngredient9}</h1>
                        <h1>{modalData.strIngredient10}</h1>
                        <h1>{modalData.strIngredient11}</h1>
                        <h1>{modalData.strIngredient12}</h1>
                        <h1>{modalData.strIngredient13}</h1>
                        <h1>{modalData.strIngredient14}</h1>
                        <h1>{modalData.strIngredient15}</h1>
                        <h1>{modalData.strIngredient16}</h1>
                        <h1>{modalData.strIngredient17}</h1>
                        <h1>{modalData.strIngredient18}</h1>
                        <h1>{modalData.strIngredient19}</h1>
                        <h1>{modalData.strIngredient20}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
