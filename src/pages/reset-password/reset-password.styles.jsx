import styled from "styled-components";

export const ResetPasswordContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
    font-family: 'Poppins', sans-serif;
    user-select: none;
`;

export const ResetPasswordContent = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ResetPasswordForm = styled.div`
    width: 30%;
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

export const ResetFormTitle = styled.div`
    background: transparent;
    color: white;
    font-family: 'Poppins', sans-serif;
    font-size: 1.5em;
    height: 10%;
    font-weight: bold;
`;

export const ResetFormInput = styled.div`
    width: 60%;
    height: 15%;
    margin: 1.5em 0;
    background: transparent;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ResetInput = styled.input`
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

export const ResetLabel = styled.label`
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

export const ResetButton = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
`;

export const Reset = styled.button`
    width: 20%;
    height: 50%;
    border: none;
    border-radius: 5px;
    background: #ff9900c7;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    transition: .3s ease-in-out;
    cursor: pointer;
`;