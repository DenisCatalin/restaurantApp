import styled, { keyframes } from "styled-components";

const galleryContentanim = keyframes`
    from {
        opacity: 0;
        pointer-events: none;
    }
    to {
        opacity: 1;
        pointer-events: all;
    }
`;

export const GalleryContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: rgb(32, 32, 32);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
`;

export const GalleryContent = styled.div`
    width: 100%;
    height: 95vh;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-template-rows: 1fr;
    gap: 2ch;
    animation: ${galleryContentanim} 1s ease-in-out;
    overflow: auto;

    @media screen and (max-width:852px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
`;

export const SeeImage = styled.button`
    cursor: pointer; 
    color: white;
    font-size: 3em; 
    background-color: transparent;
    border: none;
`;

export const Photo = styled.img`
    width: 100%;
    height: 30vh;
    border-radius: 10px;
`;