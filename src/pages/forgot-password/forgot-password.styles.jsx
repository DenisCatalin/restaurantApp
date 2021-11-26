import styled from "styled-components";

export const ForgotContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
    font-family: 'Poppins', sans-serif;
    user-select: none;
`;

export const ForgotContent = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const ForgotFormWrapper = styled.div`
    width: 40%;
    height: 50vh;
    background-color: #171717e3;
    backdrop-filter: blur(5px);
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: loginAppear 1s ease-in-out;
    transition: .3s ease-in-out;
    position: relative;
`;

export const ForgotFormTitle = styled.div`
    background: transparent;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
    height: 10%;
    font-weight: bold;
`;

export const ForgotDescription = styled.div`
    width: 80%;
    height: 20%;
    padding: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    background: rgb(17, 17, 17);
    color: white;
`;

export const ForgotFormInput = styled.div`
    width: 50%;
    height: 15%;
    margin: 1.5em 0;
    background: transparent;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ForgotInput = styled.input`
    width: 85%;
    height: 75%;
    border-radius: 5px;
    border: none;
    outline: none;
    color: white;
    padding: .5rem;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: .9em;
`;

export const ForgotLabel = styled.label`
    width: 50%;
    background: transparent;
    color: rgb(255, 255, 255);
    opacity: .5;
    position: absolute;
    top: 28%;
    left: 10%;
    font-weight: bold;
    transition: .2s ease-in-out;
    pointer-events: none;
`;

export const ForgotMessage = styled.div`
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgb(46, 6, 6);
    border-radius: 10px;
    height: 25%;
    padding: 0 .5rem;
    background: #ad4646;
    position: absolute;
    top: 65%;
    opacity: 0;
    z-index: -1;
    transition: .3s ease-in-out;
`;

export const ForgotButton = styled.div`
    width: 50%;
    height: 25%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ForgotSend = styled.button`
    width: 40%;
    height: 40%;
    border-radius: 5px;
    background: #ff9900c7;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    border: none;
    font-size: 1.1em;
    transition: .3s ease-in-out;
    cursor: pointer;
    outline: none;
`;