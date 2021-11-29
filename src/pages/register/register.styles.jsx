import styled from "styled-components";

export const RegisterContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    position: relative;
    font-family: 'Poppins', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const RegisterForm = styled.div`
    width: 30%;
    height: 80vh;
    background-color: #171717e3;
    backdrop-filter: blur(5px);
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: registerAppear 1s ease-in-out;
`;

export const RegisterFormTitle = styled.div`
    width: 100%;
    height: 5%;
    color: white;
    font-size: 1.3em;
    font-weight: bold;
    text-align: center;
    background-color: transparent;
`;

export const LoginInstead = styled.div`
    width: 50%;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;

export const RegisterFormInputs = styled.div`
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: column wrap;
    background: transparent;
`;

export const RegisterFormWrapper = styled.div`
    width: 100%;
    height: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: transparent;
`;

export const GenderRegisterForm = styled.div`
    width: 50%;
    height: 10%;
    background: transparent;
`;

export const GenderRegisterFormText = styled.h3`
    color: white;
    opacity: .5;
    background: transparent;
    text-align: center;
`;

export const SelectGenderRegister = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: transparent;
`;

export const InputCheckbox = styled.input`
    width: 60px;
    height: 30px;
    -webkit-appearance: none;
    border-radius: 20px;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.7);
    position: absolute;
    left: 44.5%;
    background-color: var(--link-hover);
`;