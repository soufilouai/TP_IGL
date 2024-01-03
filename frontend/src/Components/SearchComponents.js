import React, {useState } from "react";
import "../CSS/Css1.css";
import '../CSS/Css2.css';
import iconImage from "../images/logo.png"
import logo2 from "../images/Logo2.png"
import disvoverImage from "../images/Discover.png"
import imageFleches from "../images/fleches.png"
import logo3 from "../images/logoalt.png"


export const Recherche= () => {

  const [articles, setArticles] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonContent, setButtonContent] = useState('☆');
  const [motsCles, setMotsCles] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    setButtonContent(isClicked ? '☆' : '★');
  };

  const handleRecherche = async () => {
    console.log("Mots-clés saisis :", motsCles);
          
    const apiUrl = 'http://localhost:8000/api/articles/results/';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:3000',
      },
      body: JSON.stringify({ keywords: motsCles }),
    })
    if (!response.ok){
      console.log("erreur");
      return;
    }

    const data = await response.json();
    

    
     console.log('Donnes recues:', data);

     setArticles(data);
     
     console.log("affichage2" , articles);
  }; 



return(
  <div className="all">
      <div className="barrerecherche">
        <div className="container">
          <img src={iconImage} alt='Icon' className="logo" />
          <button className="button-alt" >
           <img src={logo3} alt="Icon" className="logoalt" />
          </button>
          <div >
              <button className='button1' style={{color : '#F2F0E6' , whiteSpace: 'nowrap'}}>
               ☆ My library
              </button>
              <button className='button2' style={{color: '#F2F0E6', whiteSpace:'nowrap' }} onClick={()=>{setShowContent(!showContent)}} >
               \/ My account
              </button>
          </div>
          {showContent && (
            <div  >
            </div>
          )}
        </div>
          <div className="logoetrecherche">
            <img src={logo2} alt='Icon' className="logo2" />
            <div className="barre-recherche-container">
              <input type="text" placeholder="Search papers from all fields of science" className="barre-recherche" value={motsCles} onChange={(e) => setMotsCles(e.target.value)} />
              <button className="bouton-recherche" onClick={handleRecherche}> Search </button>
            </div>
            <img src={imageFleches} alt='icon' className="fleches" />

          </div>
          </div>
        <div className="discoverecherche">
        <img src={disvoverImage} alt="Discover" className="discoverimage" />
     <div className="boxContainer">
        {articles.map((article) => (
          <div key={article.title} className="box2">
            <div className="boxInner">
             <h2 className="boxtitre" style={{ overflowWrap: 'break-word' }}>
             {article.title}
             </h2>
             <p className="descr">{article.summary}</p>
              {article.author && (
              <p className="Author">Author: {article.author.map((author) => `${author.name}`)}</p>
             )}

               <button className="Readmore">Read more</button>
               <button className="favori" onClick={handleClick}>
               {buttonContent}
               </button>
                </div>
                </div>
             ))}
           </div>
         </div>
       </div>
    )
}


