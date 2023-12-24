import React from 'react';
import '../CSS/scholarhub.css';
import '../CSS/acceuil2.css';
import '../CSS/basdepage.css';
import '../CSS/apercuhome.css';
import iconImage from "../images/icone.png"
import quoteImage from "../images/quote.png"


export const ScholarHub = () => {
    return(
   <div className='scholarhub'>
            <div className='extremegauche'>
               <img src={iconImage} alt="Icon" className='icone'/>
               <p className='texte'>Scholar hub</p>
            </div>
            <div class='title'>
                Scholar Hub
            </div>
            <div class='description'>
                <p>Your gateway to a rich repository of academic articles spanning diverse fields of knowledge.
                <br /> Explore groundbreaking research, insightful analyses, and thought-provoking studies curated by
                <br /> experts in their respective fields.</p>
                <button className='boutton' > Register now </button>
            </div>
            <div class='buttons'>
                <button className='login'>Log in</button>
                <button className='signup'>Sign up</button>
            </div>
   
        
        </div>
    )
}

 export const Acceuil2 = () => {
    return(
        <div className='acceuil2'>
            <div className='content'>
                <p className='titre'>
                    The most efficient article 
                    <br />
                    search engine
                </p>
                <img src={quoteImage} alt='Icon' className='quoteicone' />
                <p className='desc'>Dive into your interests, stay informed and elevate your <br />understanding. Start searching for your articles today and fuel <br />your intellectual journey.</p>
            </div>
        </div>

    )
}

export const ApercuHome = () => {
    return(
        <div className='apercuhome'>
         <h1 style={{textDecoration:'underline'}}>
            Read full articles for free
         </h1>
        </div>
    )
}




