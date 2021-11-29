import styled, { keyframes } from "styled-components";

const fade = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const ScheduleContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    animation: ${fade} 1s ease-in-out;
`;

export const ScheduleHeader = styled.div`
    width: 100%;
    height: 5vh;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ScheduleHeaderText = styled.h3`
    color: white;
    font-family: 'Poppins', sans-serif;
`;

export const ScheduleContent = styled.div`
    width: 100%;
    height: 95vh;
    padding: 1rem;
`;

export const SchedulePageTitle = styled.h1`
    text-align: center;
    color: white;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 1em;
    text-decoration: underline;
`;

export const ScheduleCards = styled.div`
    width: 100%;
    height: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: 1fr;
    user-select: none;
    overflow: auto;
`;