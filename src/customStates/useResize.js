import {useState, useEffect} from 'react'

const useResize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return { width, height }; 
    }

    const [, setWindowDimensions] = useState( getWindowDimensions() );
    useEffect(() => {
        function handleResize() { setWindowDimensions(getWindowDimensions()); }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    return { width, height }; 
}

export default useResize;