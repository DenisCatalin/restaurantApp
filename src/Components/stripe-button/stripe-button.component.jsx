import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JtdYBFn0dYLmbsfTmIg9DKORTtu6tZEBhBmbQH3zVzWMWhKUTorNbsRgp7DkY8cnf5hAfzvobkZqxTEuRLfypFc00LSn4P7jf';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CROWN CLOTHING'
            billingAddress
            shippingAddress
            image='https://p.kindpng.com/picc/s/45-451836_transparent-king-crown-clipart-king-crown-clipart-hd.png'
            descriptiong={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;