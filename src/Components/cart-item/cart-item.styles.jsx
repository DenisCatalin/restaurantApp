import styled from "styled-components";

export const CartItemContainer = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    padding: .2rem 1rem;
    position: relative;
    background: transparent;
    border-bottom: 2px solid rgba(0, 0, 0, .2);
`;

export const CartItemDetails = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    background: transparent;
`;

export const ImageCartItem = styled.img`
    width: 25%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
`;

export const CartProductDescription = styled.div`
    width: 75%;
    height: 13vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 1rem;
    font-family: 'Poppins', sans-serif;
    background: transparent;
`;

export const CartProductQuantity = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: white;
    font-family: 'Poppins', sans-serif;
    background: transparent;
`;

export const CartProductDetail = styled.h3`
    font-size: 1.3em;
    font-weight: 100;
    color: rgb(170, 170, 170);
    background: transparent;
`;

export const CartItemAddRemove = styled.button`
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: #FF9900c1;
    font-size: 1em;
`;

export const CartProductPrice = styled.div`
    width: 8%;
    height: 100%;
    margin-left: 7.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    background: transparent;
`;

export const CartItemPrice = styled.h3`
    color: rgb(134,189,52);
    background: transparent;
`;

export const CartProductTotal = styled.div`
    width: 8%;
    height: 100%;
    margin-left: 4.3em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    background: transparent;
`;

export const ProductSpan = styled.span`
    background: transparent;
    width: auto;
    height: auto;
    font-weight: bold;
    color: rgb(204, 204, 204);
`;