import React from "react"
import '../CSS/scholarhub.css';
import '../CSS/acceuil2.css';
import '../CSS/basdepage.css';
import '../CSS/apercuhome.css';
import fbImage from "../images/facebook.png"
import instaImage from "../images/instagram.png"
import iconImage from "../images/icone.png"


export const BasDePage = () =>{
    return(
        <div className='basdepage'>
            <div className='extreme'>
              <div className='extremegauche'>
                 <img src={iconImage} alt="Icon" className='icone'/>
                 <p className='texte'>Scholar hub</p>
                 <p className='adresse'>Ecole nationale Supérieure 
                 <br/>dInformatique ESI, Oued Smar 
                 <br />Alger , 16309</p>
               </div>
            <div >
                <button className='plus'>
                    <p className='textaboutus'> About Us <br/></p>
                </button>
                <button className='plus'>
                    <p className='textpolicy'>Privacy Policy<br/></p>
                </button>
                <button className='plus'>
                    <p className='textcontact'>Contact<br/></p>
                </button>
                <button className='plus'>
                    <p className='textfaq'>FAQ<br/></p>
                </button>
            <div />

        
            <div className='extremedroite'>
                 <p className='copyrights'>© 2023 all rights reserved</p>
                 <p className='follow' style={{textDecoration:'underline'}}>Follow us</p>
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

