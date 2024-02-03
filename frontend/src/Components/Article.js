import React from 'react'
import "../CSS/Css3.css"
import "../CSS/Css1.css"
import "../CSS/Css2.css"
import iconImage2 from "../images/logoblack.png"


export const Affichage = () =>{
    return(
        <div className='hdr'>
            <div className="container">
              <img src={iconImage2} alt='Icon' className="logo" color='#393731'/>
              <div >
                <button className='button1' style={{color : '#393731' , whiteSpace: 'nowrap'}}>
                    ☆ My library
                </button>
                <button className='button2' style={{color: '#393731', whiteSpace:'nowrap' }}  >
                    \/ My account
                </button>
              </div>
            </div>
        </div>
    )
}


