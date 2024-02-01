import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
/* styles */
import "../CSS/Css1.css";
import "../CSS/Css2.css";
/* images */
import iconImage from "../images/logo.png";
import logo2 from "../images/Logo2.png";
import disvoverImage from "../images/Discover.png";
import imageFleches from "../images/fleches.png";
import logo3 from "../images/logoalt.png";
import logo4 from "../images/trois.png"
import blacklogo from "../images/logoblack.png"
import frame1 from "../images/frame1.png"
import { useLocation } from "react-router-dom";


export const Recherche = () => {
  const accessToken = localStorage.getItem('token');
  const location = useLocation();
  const usernameinput = location.state ? location.state.username : null;
  const history = useHistory();
  /* use states */
  const email = location.state ? location.state.email : null;
  const [articles, setArticles] = useState([]);
  const [articles2, setArticles2] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [buttonContent, setButtonContent] = useState("☆");
  const [motsCles, setMotsCles] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [favoriteArticles, setFavoriteArticles] = useState([])




  const handleClick = (id) => {
    setFavoriteArticles((prevFavoriteArticles) => {
      if (prevFavoriteArticles.includes(id)) {
        sendFavoriteArticleRemove(id);
        return prevFavoriteArticles.filter((id) => id !== id);
      } else {
        sendFavoriteArticleAdd(id);
        return [...prevFavoriteArticles, id];
      }
    });
  };

  const sendFavoriteArticleAdd = (articleId) => {
    const apiUrl = "http://localhost:8000/api/articles/favoritadd/";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId: articleId }),
    }).then(response => {
      if (!response.ok) {
        console.log("Erreur lors de l'ajout aux favoris");
      } else {
        console.log("Article ajouté aux favoris avec succès !");
      }
    }).catch(error => {
      console.error("Erreur lors de l'envoi des données au backend:", error);
    });
  };

  const sendFavoriteArticleRemove = (articleId) => {
    const apiUrl = "http://localhost:8000/api/articles/favoritremov/";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId: articleId }),
    }).then(response => {
      if (!response.ok) {
        console.log("Erreur lors de la suppression dans favoris");
      } else {
        console.log("Article supprime de favoris avec succès !");
      }
    }).catch(error => {
      console.error("Erreur lors de l'envoi des données au backend:", error);
    });
  };


  /* getting articles du backend pour les resultats de la recherche */
  const handleRecherche = async () => {
    console.log("Mots-clés saisis:", motsCles);
    try {
      const apiUrl = "http://localhost:8000/api/articles/results/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
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
      console.log("les articles dans search", articles);
      history.push({
        pathname: "/Resultats",
        state: {
          articles: parsedData,
          motsCles: motsCles
        },
      });
      console.log("afficher les articles pour les resultats", articles);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl2 = "http://localhost:8000/api/articles/results/";
        const response2 = await fetch(apiUrl2, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:3000",
          },
        });

        if (!response2.ok) {
          console.log("Erreur2");
          return;
        }

        const data2 = await response2.json();
        const parsedData2 = JSON.parse(data2);
        setArticles2(parsedData2);
        console.log("les articles random", articles2);
      } catch (error) {
        console.error("Erreur lors de la récupération des données2:", error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="all">
      <div className="barrerecherche">
        <div className="container">
          <img src={iconImage} alt='Icon' className="logo" />
          <button className="button-alt" onClick={() => { setShowContent2(!showContent2) }}>
            <img src={logo3} alt="Icon" className="logoalt" />
          </button>
          { /* affichage nom, email, log out button media query */}
          {showContent2 && (
            <div className="media-account-frame" >
              <button className="trois-traits" onClick={() => { setShowContent2(false) }}>
                <img src={logo4} alt="Icon" className="logoalt2" />
              </button>
              <img src={blacklogo} alt="Icon" className="black-logo" />
              {/* afficher the username/email used when loging/signin up  */}
              <p className="username"> {usernameinput}</p>
              <p className="email"> {email} </p>
              <Link to="/library">
                <button className="Mylibrary" >
                  My library
                </button>
              </Link>
              <Link to="/">
                <button className="Logout" >
                  Log Out
                </button>
              </Link>
              <p className="copyrights-media">© 2023 all rights reserved</p>
            </div>
          )}
          {/* fin affichage pour media query */}
          <div >
            <Link to="/library">
              <button className='button1' style={{ color: '#F2F0E6', whiteSpace: 'nowrap' }}>
                ☆ My library
              </button>
            </Link>
            <button className='button2' style={{ color: '#F2F0E6', whiteSpace: 'nowrap' }} onClick={() => { setShowContent(!showContent) }} >
              \/ My account
            </button>
            {/* affichage compte(username/email/logout button) for desktop  */}
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
          {/* affichage des articles recuperees du back  */}
          {articles2.map((article) => (
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
                <button className="favori" style={{ color: favoriteArticles.includes(article.id) ? '#B08B56' : '#393731' }} onClick={() => handleClick(article.id)}>
                  ☆
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


