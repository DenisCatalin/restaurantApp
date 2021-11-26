import styled from "styled-components";

export const CartMain = styled.div`
    width: 100%;
    min-height: 100vh;
    background: transparent;
    display: flex;
    overflow: hidden;

    @media screen and (max-width: 1260px) {
        flex-direction: column; 
    }
`;

export const OpacitySpace = styled.div`
    width: 75%;
    height: 100vh;
    background: transparent;

    @media screen and (max-width: 1260px) {
        width: 100%;
    }
`;

export const CartContainer = styled.div`
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 2rem;
`;

export const CartItems = styled.div`
    width: 100%;
    height: 95%;
    background: #383838;
    border-radius: 5px;
    animation: fromDownAndScale .5s ease-in-out;
    padding: 2rem;
    overflow: auto;
`;

export const CartTable = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    color: #FF9900c7;
    background: transparent;
    border-top: 2px solid rgba(0, 0, 0, .2);
    border-bottom: 2px solid rgba(0, 0, 0, .2);
`;

export const SummarySpace = styled.div`
    width: 25%;
    height: 100vh;
    background: rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1260px) {
        width: 50%; 
        transform: translate(50%);
        height: 50vh;
    }

    @media screen and (max-width: 1024px) {
        width: 50%; 
        transform: translate(50%);
        height: 80vh;
    }
}
`;

export const Summary = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 60%;
    background: #383838;
    border-radius: 10px;
    transform: translateX(-3%);
    animation: fromDownAndScale 1s ease-in-out;
    padding: 0 2rem;
    font-family: 'Poppins', sans-serif;
`;

export const SummaryTitle = styled.div`
    font-size: 1.5em;
    color: rgb(204, 204, 204);
    background: transparent;
`;

export const SummaryItems = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    color: rgb(204, 204, 204);
`;

export const ShippingDiv = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(204, 204, 204);
    font-size: 1.2em;
    background: transparent;
`;

export const SelectDelivery = styled.select`
    width: 50%;
    height: 70%;
    outline: none;
    border: 2px solid #AAA;
    color: white;
    border-radius: 10px;
`;

export const DisccountSummary = styled.div`
    background: transparent;
    font-size: 1.1em;
    color: rgb(204, 204, 204);
    width: 100%;
    height: 20%;
`;

export const DisccountSummaryInput = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
`;

export const InputDisccount = styled.input`
    width: 75%;
    height: 40%;
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 0 .5rem;
    color: rgb(204, 204, 204);
`;

export const ApplyDisccount = styled.button`
    width: 20%;
    height: 40%;
    border: none;
    border-radius: 5px;
    outline: none;
    color: rgb(204, 204, 204);
    font-weight: bold;
    cursor: pointer;
`;  

export const TotalSummary = styled.div`
    width: 100%;
    background: transparent;
    color: rgb(204, 204, 204);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const TextSpace45 = styled.h2`
    width: 45%; 
    background: transparent;
    font-size: 1.2em;
`;

export const TextSpace15 = styled.h2`
    width: 15%; 
    background: transparent;
    font-size: 1.2em;
`;

export const TextSpace10 = styled.h2`
    width: 10%; 
    background: transparent;
    font-size: 1.2em;
`;

export const NoItemsMessage = styled.div`
    background: transparent;
    font-family: 'Poppins', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;