import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { PageHeaderContainer } from './page-header.styles'

const PageHeader = ({path}) => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);

    return (
        <PageHeaderContainer style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <Link to={path} className="fas fa-arrow-left" style={{color: darkmode ? '#FFF' : '#000'}}></Link>
        </PageHeaderContainer>
    )
}

export default PageHeader;
