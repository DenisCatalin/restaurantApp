import styled, { keyframes } from 'styled-components';
import image from '../../img/about.jpg';

const opacityAbout = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const AboutContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: ${opacityAbout} 1s ease-in-out;
`;

export const AboutContent = styled.div`
    width: 90%;
    height: 90vh;
    display: flex;
`;

export const AboutTextContainer = styled.div`
    width: 70%;
    height: 100%;
    background: rgb(49, 49, 49);
    border-radius: 10px 0 0 10px;
    padding: 1rem;
    overflow: auto;

    
    @media screen and (max-width: 450px) {
        width: 100%;
        border-radius: 10px;
    }
`;

export const AboutTextTitle = styled.h2`
    width: 100%;
    height: 10%;
    font-size: 3em;
    background: transparent;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    color: white;
    letter-spacing: 2px;

    @media screen and (max-width: 450px) {
        font-size: 2em; 
    }

    @media screen and (max-height: 450px) {
        font-size: 2em; 
        margin-bottom: 1em; 
    }
`;

export const AboutText = styled.div`
    background: transparent;
    color: rgb(204, 204, 204);
    font-size: 1.15em;
    letter-spacing: 1px;
    font-weight: bold;
    font-family: 'Courier New', Courier, monospace;

    @media screen and (max-width: 450px) {
        font-size: 1em; 
    }

    @media screen and (max-height: 450px) {
        font-size: .9em; 
    }
`;

export const AboutImage = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 0 10px 10px 0;

    @media screen and (max-width: 450px) {
        display: none;
    }
`; 