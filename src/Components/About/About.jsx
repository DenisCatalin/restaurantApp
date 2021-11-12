import { Link } from "react-router-dom"
import {useState, useEffect} from 'react'
import './about.css'

const About = () => {
    const darkmodeBool = JSON.parse(localStorage.getItem('darkmode'));
    const [darkmode, setDarkmode] = useState(darkmodeBool);

    useEffect(() => {
        if(darkmodeBool === true) setDarkmode(true);
        else setDarkmode(false);
    }, [darkmodeBool]);
    return (
        <div className='about-page' style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
            <div className="about-header" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <Link to='/' className="fas fa-arrow-left arrow-modal" style={{color: darkmode ? '#FFF' : '#000'}}></Link>
            </div>
            <div className="about-container" style={{background: darkmode ? '#252525' : '#EEEEEE'}}>
                <div className="text-side" style={{background: darkmode ? 'rgb(49, 49, 49)' : '#AAA'}}>
                    <h2 className="about-title" style={{color: darkmode ? 'rgb(204, 204, 204)' : 'rgb(10, 10, 10)'}}>ABOUT US</h2>
                    <div className="about-text" style={{color: darkmode ? 'rgb(204, 204, 204)' : 'rgb(10, 10, 10)'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt aliquid ab sapiente nemo veritatis ea corrupti ut, dignissimos fuga eum itaque possimus quas, adipisci amet libero odio nihil nulla modi magnam sint esse consequuntur nam? Deleniti aut asperiores id ipsum omnis, laudantium rerum? Minus, facilis atque eos odio tenetur iste aliquid asperiores cumque amet non quam vel iure officiis! Nihil magni natus fuga commodi libero, laboriosam fugiat, quaerat molestias ut, vitae earum nisi aliquid? Similique tempore id optio officia maiores. Deleniti debitis iusto ipsum inventore corrupti qui, sequi laudantium, eum dolorum facilis dolor, magnam facere nostrum architecto quae at? Assumenda nesciunt voluptatem ipsum error necessitatibus, eius soluta ducimus! Possimus expedita dolore id quas dolor, tempora, distinctio nihil debitis magnam officiis quibusdam reiciendis? Quisquam saepe maiores porro similique id nihil iste quam tempore repellendus, dolores ut obcaecati earum magnam non quaerat fuga, quibusdam, molestias mollitia expedita repudiandae exercitationem? Suscipit ratione soluta dolorem? Nemo molestiae, accusantium vitae cupiditate iure libero harum ipsam consequatur ab. Quas reiciendis sint veniam recusandae nostrum ex ducimus quia tenetur similique nisi reprehenderit mollitia ullam rem sunt possimus fugit, aut eos dolore quaerat voluptatibus fugiat. Necessitatibus unde aliquam nam at omnis numquam et ea soluta praesentium, non voluptates. Modi, accusantium totam. Ducimus vero fugiat provident sit dolorem maiores reprehenderit, corporis ipsa porro tempora doloremque incidunt atque natus facere exercitationem? Veritatis, itaque? Quis et rerum similique numquam vitae repellat cupiditate magni velit sint perspiciatis nihil minima fugit corporis dolor repellendus voluptatum iste culpa, quidem consectetur dolorum nobis nesciunt debitis. Odit at eum blanditiis assumenda quasi magni distinctio nisi nulla magnam, cum dicta sequi minima corrupti in quibusdam perferendis omnis voluptatem ipsam fugiat voluptatum voluptates modi ullam? Optio animi, facere nesciunt molestias quisquam sapiente! Laudantium, repellat! Saepe ratione eveniet unde ad nostrum quis voluptates fugit enim impedit corporis, debitis, vel a veniam ipsam, nam vero perferendis amet eos. Veniam fuga rem id vitae molestias, quidem quos ducimus mollitia voluptatem natus est minima dolores consequuntur nesciunt quam pariatur assumenda provident laboriosam at. Ab totam alias doloribus, enim, quo culpa ut repellat nostrum molestias corrupti beatae reprehenderit labore similique. Labore iusto, praesentium incidunt voluptate porro exercitationem perferendis eaque fugiat, qui cupiditate rerum veritatis temporibus laborum dolore quod sit dolor cumque facilis nisi. Molestias provident enim rem eaque, ullam fugit quo repellat autem voluptates culpa voluptatum, assumenda adipisci at. Pariatur quibusdam dicta itaque est aut maiores nobis dolor ratione, accusantium expedita nam deserunt?</div>
                </div>
                <div className="img-side"></div>
            </div>
        </div>
    )
}

export default About
