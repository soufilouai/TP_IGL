import React from 'react';
import '../CSS/Css1.css';
import iconImage from "../images/logo.png"
import iconQuote from "../images/quote.png"
import imgDiscover from "../images/Titrediscover.png"



export const ScholarHub = () => {
    return(
        <div className='body1'>
   <div className="page1" >
    <header className="main_header">
        <div className="container" >
            <img src={iconImage} alt='Icone' className='logo' />
            <div >
                <button className='button1' style={{color : '#F2F0E6' , whiteSpace: 'nowrap'}}>
                    Log In 
                </button>
                <button className='button2' style={{color: '#DBB071', whiteSpace:'nowrap' }}>
                    Sign Up 
                </button>
            </div>
        </div>
    </header>
    <div className='titre_description_boutton'>
        <h1 className='titre' style={{ fontSize:'6vw' , whiteSpace:'nowrap', fontFamily: 'Imperial Roman'}}> Scholar Hub </h1>
        <p style={{fontFamily:'Source Sans Pro', fontSize:'1.5vw'}}>Your gateway to a rich repository of academic articles spanning diverse fields of knowledge.
        <br/>Explore groundbreaking research, insightful analyses, and thought-provoking studies curated by experts in their respective fields.</p>
        <button className='Registernow'>Register now</button>
        
    </div>
   </div>
   </div>
    )
}



export const Acceuil2 = () =>{
    return(
        <div className='body2'>
            <img src={iconQuote} alt='Icon' className='quote' />
            <div className='titre_description'>
                <h1 className='titre2'>The most efficient article <br/> search engine</h1>
                <p className='desc' >Dive into your interests, stay informed, and elevate your <br/> understanding. Start searching for your articles today and fuel <br/> your intellectual journey.</p>
            </div>
        </div>
    )
}

export const Discover =() =>{

    
    return(
        <div className='body3'>
            <img src={imgDiscover} alt='Icon' className='Readfull'/>
        <div className='boxContainer'>
            <div className='box'>
                <div className='boxInner'>
                <h2 className="boxtitre" style={{overflowWrap:'break-word'}}>Quantum Entanglement: Bridging the Unseen Realms</h2>
                <p className='descr'>Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing the interconnected fabric of the universe. Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the</p>
                <p className='Author'>Author: Dr. Olivia Sterling</p>
                </div>
            </div>
            <div className='box'>
            <div className='boxInner'>
                <h2 className="boxtitre" style={{overflowWrap:'break-word'}}>Neuroplasticity: The Brain's Astonishing Resilience</h2>
                <p className='descr'>Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing the interconnected fabric of the universe.</p>
                <p className='Author'>Author: Dr. Olivia Sterling</p>
                </div>
            </div>
            <div className='box'>
            <div className='boxInner'>
                <h2 className="boxtitre" style={{overflowWrap:'break-word'}}>Green Technology: Harnessing Nature's Blueprint</h2>
                <p className='descr'>Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing the interconnected fabric of the universe. Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing</p>
                <p className='Author'>Author: Dr. Olivia Sterling</p>
                </div>
            </div>
            <div className='box'>
            <div className='boxInner'>
                <h2 className="boxtitre" style={{overflowWrap:'break-word'}}>Quantum Entanglement: Bridging the Unseen Realms</h2>
                <p className='descr'>Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing the interconnected fabric of the universe.</p>
                <p className='Author'>Author: Dr. Olivia Sterling</p>
                </div>
            </div>
            <div className='box'>
            <div className='boxInner'>
                <h2 className="boxtitre" style={{overflowWrap:'break-word'}}>Quantum Entanglement: Bridging the Unseen Realms</h2>
                <p className='descr'>Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing the interconnected fabric of the universe. Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries</p>
                <p className='Author'>Author: Dr. Olivia Sterling</p>
                </div>
            </div>
            <div className='box'>
            <div className='boxInner'>
                <h2 className="boxtitre" style={{overflowWrap:'break-word'}}>Quantum Entanglement: Bridging the Unseen Realms</h2>
                <p className='descr'>Explore the groundbreaking research of Dr. Olivia Sterling as she unravels the mysteries of quantum entanglement, revealing the interconnected fabric of the universe.</p>
                <p className='Author'>Author: Dr. Olivia Sterling</p>
                </div>
            </div>


        </div>
        </div>
    )
}