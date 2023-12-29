import React, {useState , useEffect} from "react";
import '../CSS/Css2.css';
import "../CSS/Css1.css";
import iconImage from "../images/logo.png"
import logo2 from "../images/Logo2.png"
import disvoverImage from "../images/Discover.png"
import imageFleches from "../images/fleches.png"


export const BarreDeRecherche= () => {

  const [motsCles, setMotsCles] = useState("");
  const [showContent, setShowContent] = useState(false);

  
  const handleRecherche = () => {
    console.log("Mots-clés saisis :", motsCles);
  };


  return(
      <div className="barrerecherche">
        <div className="container">
          <img src={iconImage} alt='Icon' className="logo" />
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
    )
}

export const Discoverrech= () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/api/articles/')
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonContent, setButtonContent] = useState('☆');

  const handleClick = () => {
    setIsClicked(!isClicked);
    setButtonContent(isClicked ? '☆' : '★');
  };



  return(
    <div className="discoverecherche">
      <img src={disvoverImage} alt='Discover' className="discoverimage"  />
      <div className='boxContainer'>
      {articles.map(article => (
        <div key={article.title} className='box'>
          <div className='boxInner'>
            <h2 className="boxtitre" style={{ overflowWrap: 'break-word' }}>{article.title}</h2>
            <p className='descr'>{article.summary}</p>
            <p className='Author'>Author: {article.author}</p>
            <button className='Readmore'>Read more</button>
            <button className='favori' onClick={handleClick}> {buttonContent}</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
