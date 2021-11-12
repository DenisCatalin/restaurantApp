import {useState, useEffect} from 'react'

const useIP = () => {
    const [ip, setIP] = useState(0);

    useEffect(() => {
        (async function () {
            const res = await fetch(`https://api.db-ip.com/v2/free/self`);
            const data = await res.json();
            setIP(data.ipAddress);
        }());
    }, [ip]);
    return { ip }
}

export default useIP