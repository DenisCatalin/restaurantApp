import NavBar from './NavBar'

const Home = () => {

    return (
        <div className='landing-page' >
            <div className="page">
                <NavBar/>
                <div className="main-container">
                    <div className="center-landing-container">
                        <div className="text-section-landing">
                            <h3>WELCOME TO</h3>
                            <h1>THE NAME OF OUR RESTAURANT</h1>
                            <h2>THE FINEST RESTAURANT IN THE AREA</h2>
                        </div>
                        <div className="button-section-landing">
                            <button className="read-more-landing">READ MORE</button>
                            <button className="book-a-place">BOOK A TABLE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
