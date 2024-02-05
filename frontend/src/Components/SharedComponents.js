import React from "react"
import '../CSS/Css1.css';
import '../CSS/Css2.css';
import '../CSS/Css3.css'
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useHistory, useLocation } from 'react-router-dom';
/* les logos des reseaux sociaux */
import fbImage from "../images/facebook.png"
import instaImage from "../images/instagram.png"
import iconImage from "../images/logo.png"   /* le logo du bas de page */
import blacklogo from "../images/logoblack.png"
import iconsearch from "../images/searchicon.png"
import frame1 from "../images/frame1.png"



export const BasDePage = () => {
    return (
        <div className='basdepage'>
            <div className='extreme'>
                <div className='extremegauche'>
                    <img src={iconImage} alt="Icon" className='icone' />
                    <p className='adresse'>Ecole nationale Supérieure
                        <br />dInformatique ESI, Oued Smar
                        <br />Alger , 16309</p>
                </div>
                <div >
                    <button className='plus'>
                        <p className='textaboutus'> About Us <br /></p>
                    </button>
                    <button className='plus'>
                        <p className='textpolicy'>Privacy Policy<br /></p>
                    </button>
                    <button className='plus'>
                        <p className='textcontact'>Contact<br /></p>
                    </button>
                    <button className='plus'>
                        <p className='textfaq'>FAQ<br /></p>
                    </button>
                    <div />
                    <div className='extremedroite'>
                        <p className='copyrights'>© 2023 all rights reserved</p>
                        <p className='follow' style={{ textDecoration: 'underline' }}>Follow us</p>

                        <button className='resButton'>\
                            <img src={fbImage} alt="Icone" className='fbicone' />
                        </button>
                        <button className='resButton'>
                            <img src={instaImage} alt='Icone' className='instaicone' />
                        </button>
                    </div>
                </div>
            </div >
        </div>
    )
}


export const ResultsHeader = () => {
    const [motsCles, setMotsCles] = useState("");
    const [articles, setArticles] = useState([]);
    const history = useHistory();
    const [showContent, setShowContent] = useState(false);
    const location = useLocation();
    const usernameinput = location.state ? location.state.username : null;
    const email = location.state ? location.state.email : null;
    const accessToken = localStorage.getItem("token");

    /*******************get articles pour la recherche faite dans la page results ************************/
    const handleRecherche = async () => {
        try {
            const apiUrl = "http://localhost:8000/api/articles/results/";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    Origin: "http://localhost:3000",
                },
                body: JSON.stringify({ keywords: motsCles }),
            });

            if (!response.ok) {
                console.log("Erreur");
                return;
            }
            const data = await response.json();
            const parsedData = JSON.parse(data);
            setArticles(parsedData);
            const token = localStorage.getItem("token");
            const decodedtoken =jwtDecode(token);
            if(decodedtoken.is_admin){
                history.push({
                pathname: "/Resultatsadmin/",
                state: {
                    articles: parsedData,
                    motsCles: motsCles
                },
                });
            }else{
                if(decodedtoken.is_moderator){
                history.push({
                    pathname: "/Resultatsmod/",
                    state: {
                    articles: parsedData,
                    motsCles: motsCles
                    },
                });
                }else{
                history.push({
                    pathname: "/Resultats/",
                    state: {
                    articles: parsedData,
                    motsCles: motsCles
                    },
                });
                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };


    return (
        <div className="resultatsPage">
            <header className='main_header'>
                <div className='container'>
                    <img src={blacklogo} alt='Icone' className='logo' onClick={() => window.location.href='/search'} />
                    <button className='boutton-image-recherche' onClick={handleRecherche}>
                        <img src={iconsearch} alt='Icone' className='searchimage' />
                    </button>
                    <div>
                        <div className='searchbar'>
                            <input type="text" placeholder="Search.." className="header-search" value={motsCles} onChange={(e) => setMotsCles(e.target.value)} />
                        </div>
                    </div>
                    <Link to='/library/'>
                        <button className='buttonlib' style={{ color: '#393731', whiteSpace: 'nowrap' }}>
                            ☆My library
                        </button>
                    </Link>
                    <button className='buttonacc' style={{ color: '#393731', whiteSpace: 'nowrap' }} onClick={() => { setShowContent(!showContent) }} >
                        𝘃 My account
                    </button>
                    {showContent && (
                        <div>
                            <img src={frame1} alt="Icon" className="frame1" />
                            <p className="user-frame1"> {usernameinput} </p>
                            <p className="email-frame1"> {email} </p>
                            <Link to='/'>
                                {/* when clicking on the button logout, switch to home  */}
                                <button className="logout-frame1">Log out</button>
                            </Link>
                        </div>
                    )}
                </div>
            </header >

        </div >
    )
}

