import {useState, useEffect} from 'react'
import useResize from '../../../../customStates/useResize'

const OrderItem = ({orderID}) => {
    const { height } = useResize();
    const [heightOn, setHeightOn] = useState(false);

    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    return (
        <div className='profile-order' style={{height: heightOn ? '30%' : height > 800 ? '12%' : '15%'}}>
            <div className="profile-order-up">
                <h3 className='profile-order-title' style={{color: darkmode ? '#FFF' : '#222'}}>Kentuchy Fried Chicken</h3>
                <h3 className='profile-order-price' style={{color: darkmode ? 'rgb(48, 185, 48)' : '#222'}}>$15.99</h3>
            </div>
            <div className="profile-order-down">
                <h2 className='profile-order-date' >January-25-2022</h2>
                <button className='profile-order-payment' onClick={() => setHeightOn(!heightOn)}>{heightOn ? 'READ LESS' : 'READ MORE'}</button>
            </div>
        </div>
    )
}

export default OrderItem
