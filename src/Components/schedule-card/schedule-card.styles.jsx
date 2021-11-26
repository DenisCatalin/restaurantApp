import styled, { keyframes } from "styled-components";

const flipCard = keyframes`
    from { transform: rotateX(10deg) rotateY(90deg); }
`;

export const ScheduleItem = styled.div`
    width: 80%;
    height: 40vh;
    border-radius: 5px;
    background: rgb(56, 56, 56);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    gap: 2ch;
    margin-bottom: 1em;
    font-family: 'Poppins', sans-serif;
    animation: ${flipCard} 1s ease-in-out;
`;

export const ScheduleCardImage = styled.div`
    width: 6em;
    height: 6em;
    background: #ff9900;
    border-radius: 50%;
`;

export const ScheduleDate = styled.h3`
    width: 50%;
    text-align: center;
    font-weight: 100;
    opacity: .5;
    background-color: transparent;
`;

export const ScheduleDescription = styled.div`
    background-color: transparent;
    text-align: center;
    width: 80%;
    height: 20%;
    color: white;
    font-weight: bold;
`;