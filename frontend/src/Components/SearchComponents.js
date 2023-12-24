import React from "react";
import "../CSS/barrerecherche.css"
import "../CSS/discover.css"
import iconImage from "../images/icone.png"
import iconLibrary from "../images/library.png"
import iconAccount from "../images/account.png"



export const BarreRecherche = () =>{
    return(
        <div className="barrerecherche">
            <div className="extremegauche">
            <img src={iconImage} alt="Icon" className='icone'/>
            <p className='texte'>Scholar hub</p>
            </div>
            <div className='title&icon'>
                <div class='title'> Scholar Hub </div>
                <img src={iconImage} alt='Icon' className="rechIcone"/>
            </div>
            <div>
                <button className="libacc">
                    <img src={iconLibrary} alt='Icone' className="iconelib" />
                    <p className="lib">My library </p>
                </button>
                <button className="libacc">
                    <img src={iconAccount} alt='Icone' className="iconeacc" />
                    <p className="acc">My account </p>
                </button>
            </div>
        </div>
    )
}


export const Discover = () => {
    return (
        <div className="discover">
            <p className="titrediscover" style={{textDecoration:'underline'}}>Discover</p>     
        </div>

    )
}