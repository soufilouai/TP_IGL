import React from "react";
import '../CSS/Css2.css';
import "../CSS/Css1.css";
import iconImage from "../images/logo.png"
import iconText from "../images/Titlerech.png"

export const BarreDeRecherche= () => {

    return(
        <div className="barrerecherche">
          <img src={iconImage} alt='Icon' className="logo" />
        </div>
    )
}
