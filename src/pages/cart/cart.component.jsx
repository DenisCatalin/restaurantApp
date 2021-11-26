import {useState, useEffect} from 'react'
import CartItem from '../../Components/cart-item/cart-item.component'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal, selectCartItemsCount } from '../../redux/cart/cart.selectors'
import StripeCheckoutButton from '../../Components/stripe-button/stripe-button.component'
import PageHeader from '../../Components/page-header/page-header.component'
import { CartMain, OpacitySpace, CartContainer, CartItems, CartTable, SummarySpace, Summary, SummaryTitle, SummaryItems, ShippingDiv, SelectDelivery, DisccountSummary, DisccountSummaryInput, InputDisccount, ApplyDisccount, TotalSummary, TextSpace45, TextSpace10, TextSpace15, NoItemsMessage } from './cart.styles'

const CartPage = () => {
    const cartItemss = useSelector(selectCartItems);
    const cartTotall = useSelector(selectCartTotal);
    const cartItemsCount = useSelector(selectCartItemsCount);

    let deliveryOptions = ['Personal Pick-up - $0.00', 'Standard delivery - $4.00', 'Fast Delivery - $8.00'];
    const [delivery, setDelivery] = useState('');
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);
    const [deliveryFee, setDeliveryFee] = useState(0);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    return (
        <CartMain style={{background: darkmode ? '#252525' : '#AAA'}}>
            <OpacitySpace>
                <PageHeader path={'/menu'} />
                <CartContainer>
                    <CartItems style={{background: darkmode ? '#383838' : '#CCC'}}>
                        <CartTable>
                            <TextSpace45 style={{color: darkmode ? '#FF9900' : '#000'}}>Product</TextSpace45>
                            <TextSpace15 style={{color: darkmode ? '#FF9900' : '#000'}}>Quantity</TextSpace15>
                            <TextSpace10 style={{color: darkmode ? '#FF9900' : '#000'}}>Price</TextSpace10>
                            <TextSpace15 style={{color: darkmode ? '#FF9900' : '#000'}}>Total</TextSpace15>
                        </CartTable>
                        {
                            cartItemss.length === 0 ?
                            <NoItemsMessage><h3 style={{color: darkmode ? 'white' : 'black', transform: 'translateX(-200%)', background: 'transparent'}}>No items yet</h3></NoItemsMessage>
                            :
                            cartItemss.map(cartItem => (
                                <CartItem cartItem={cartItem} code={cartItem.idMeal} key={cartItem.idMeal} price='15.99'/>
                            ))
                        }
                    </CartItems>
                </CartContainer>
            </OpacitySpace>
            <SummarySpace style={{background: darkmode ? '#252525' : '#AAA'}}>
                <Summary style={{background: darkmode ? '#383838' : '#CCC'}}>
                    <SummaryTitle style={{color: darkmode ? '#CCC' : '#000'}}>ORDER SUMMARY</SummaryTitle>
                    <SummaryItems>
                        <h3 style={{color: darkmode ? '#CCC' : '#000', background: 'transparent'}}>YOU GOT {cartItemsCount} ITEMS</h3>
                        <h3 style={{color: darkmode ? '#ccc' : '#000', background: 'transparent'}}>${cartTotall.toFixed(2)}</h3>
                    </SummaryItems>
                    <ShippingDiv>
                        <h3 style={{color: darkmode ? '#ccc' : '#000', background: 'transparent'}}>SHIPPING</h3>
                        <SelectDelivery style={{background: darkmode ? '#252525' : '#383838'}} name="month" id="month" value={delivery} 
                        onChange={(e) => { 
                            setDelivery(e.target.value); 
                            if(e.target.value === deliveryOptions[0]) { setDeliveryFee(0) }
                            if(e.target.value === deliveryOptions[1]) { setDeliveryFee(4) }
                            if(e.target.value === deliveryOptions[2]) { setDeliveryFee(8) }
                        }}>{deliveryOptions.map((del, i) => { return <option value={del} key={i}>{del}</option> })}</SelectDelivery>
                    </ShippingDiv> 
                    <DisccountSummary>
                        <h4 style={{color: darkmode ? '#CCC' : '#000', background: 'transparent'}}>APPLY A DISCCOUNT CODE</h4>
                        <DisccountSummaryInput>
                            <InputDisccount type="text" style={{background: darkmode ? '#252525' : '#EEE'}} placeholder='Apply disccount code'/>
                            <ApplyDisccount style={{background: darkmode ? '#252525' : '#EEE', color: darkmode ? '#CCC' : '#000'}}>APPLY</ApplyDisccount>
                        </DisccountSummaryInput>
                    </DisccountSummary>
                    <TotalSummary>
                        <h3 style={{color: darkmode ? '#CCC' : '#000', background: 'transparent'}}>TOTAL COST</h3>
                        <h3 style={{color: darkmode ? '#CCC' : '#000', background: 'transparent'}}>${(cartTotall+deliveryFee).toFixed(2)}</h3>
                    </TotalSummary>
                    <StripeCheckoutButton price={cartTotall}>CHECKOUT</StripeCheckoutButton>
                </Summary>
            </SummarySpace>
        </CartMain>
    )
}

export default CartPage