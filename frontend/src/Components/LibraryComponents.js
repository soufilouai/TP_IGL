
import React from "react"

import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import '../CSS/Css1.css';
import '../CSS/Css2.css'
import '../CSS/Css3.css'
import LibImage from "../images/mylib.png"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";



export const Filtres = () => {

    const location = useLocation();
    const [articles, setArticles] = useState([]);
    const keyword = location.state ? location.state.motsCles : null;
    /* use states */
    const [inputValue, setInputValue] = useState('');
    const [articlesfiltres, setArticlesFiltres] = useState([]);
    const [favoriteArticles, setFavoriteArticles] = useState([]);
    const [inputValue2, setInputValue2] = useState('');
    /* c'est pour l'envoi des filtres au back */
    const [selectedFilters, setSelectedFilters] = useState({
        keyword: keyword,
        keywords: '',
        author: '',
        institution: '',
        start_date: '',
        end_date: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 3;
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    const accessToken = localStorage.getItem("token");

    /*********************** ajouter lid  la liste des favoris when clicking sur l'etoile *************/
    const handleClick = (id) => {
        setFavoriteArticles((prevFavoriteArticles) => {
            if (prevFavoriteArticles.includes(id)) {
                sendFavoriteArticle(id);
                return prevFavoriteArticles.filter((id) => id !== id);
            } else {
                sendFavoriteArticle(id);
                return [...prevFavoriteArticles, id];
            }
        });
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        // const accessToken = '';
        const fetchData = async () => {
            try {
                const apiUrl2 = "http://localhost:8000/api/articles/favoris/";
                const response2 = await fetch(apiUrl2, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!response2.ok) {
                    console.log("Erreur2");
                    return;
                }
                const data2 = await response2.json();
                const parsedData2 = JSON.parse(data2);
                setArticles(parsedData2);
                console.log(`Response status: ${response2.status}`);
                console.log(`Data received: ${JSON.stringify(data2)}`);

            } catch (error) {
                console.error("Erreur lors de la récupération des articles favoris:", error);
            }
        };
        fetchData();
    }, []);

    /*********************** ouvrir l'article dans un nouvel onglet ************************/
    const openpdf = (link) => {
        window.open(link, '_blank');
    }

    /**************************** Requetes pour ajout et suppression de favoris *******************/
    const sendFavoriteArticle = (articleId) => {
        const apiUrl = `http://localhost:8000/api/articles/${articleId}/addFav/`;

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
    /********************************************************************************************/
    /************rajouter les filtres a la liste qd les bouttons correspondants sont selectionnes*******/
    const handleButtonClick = (buttonId) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [buttonId]: prevFilters[buttonId] === keyword ? '' : keyword,
        }));
    };
    useEffect(() => {
        setSelectedFilters((prevFilters) => {
            return {
                ...prevFilters,
                //['keyword']: prevFilters['keyword'] === keyword ? '' : keyword,
                ['start_date']: prevFilters['start_date'] === inputValue ? '' : inputValue,
                ['end_date']: prevFilters['end_date'] === inputValue2 ? '' : inputValue2,

            };
        });
    }, [inputValue, inputValue2]);
    /*********************************************************************************************8*/
    /************************************** Lancer le filtre **************************************/
    const history = useHistory();
    const handleRequete = async () => {
        try {
            const apiUrl = "http://localhost:8000/api/articles/filter/";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    Origin: "http://localhost:3000",
                },
                body: JSON.stringify({ keywords: selectedFilters }),
            });
            if (!response.ok) {
                console.log("Erreur");
                return;
            }
            const data = await response.json();
            const parsedData = JSON.parse(data);
            history.push({
                pathname: "/Resultats",
                state: { articles: parsedData },
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    /*********** les bouttons pour afficher plus d'articles***************************************/
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const[url,getUrl] = useState("");

    const handlepdf = (filename) => {
        const apiUrl = `http://localhost:8000/api/articles/affichage/?filename=${filename}`;
      
        return fetch(apiUrl, {
          method: "GET",
          headers: {
            // Include any headers you need
            // For example, if you're sending JSON, you might include:
            // 'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            // Handle the data returned from the server
            const filePath = data.file_path;
            window.open(filePath, '_blank');
            // You can return the file path or handle it as needed
            
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
            throw error; // Rethrow the error to handle it in the calling code if needed
          });
      };


      


    return (
        <div>
            <div className="resultrecherche">
                <img src={LibImage} alt="Mylibrary" className="librimage"  />
                <div className="results_filtres">
                    <div className="box-filtre">
                        <div >
                            <p className="filter-titre">Filter results </p>
                        </div>
                        <div className="sort">
                            <button className="date-sort" style={{ color: selectedFilters['keywords'] !== '' ? '#B08B56' : '#393731' }} onClick={() => handleButtonClick('keywords')}>• Sort by keywords</button>
                            <button className="date-sort" style={{ color: selectedFilters['author'] !== '' ? '#B08B56' : '#393731' }} onClick={() => handleButtonClick('author')}>•Sort by authors </button>
                            <button className="date-sort" style={{ color: selectedFilters['institution'] !== '' ? '#B08B56' : '#393731' }} onClick={() => handleButtonClick('institution')}>•Sort by institutions</button>
                        </div>
                        <div className="horizontal-line"></div>
                        <p className="customrange" >Custom range...</p>
                        <div className="range">
                            <input type="text" className="begin" value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} ></input>
                            <button className="fleche">⮕</button>
                            <input type="text" className="begin" value={inputValue2}
                                onChange={(e) => setInputValue2(e.target.value)}></input>
                        </div>
                        <div className="horizontal-line"></div>
                        <button className="boutton-filter" onClick={handleRequete}> Filter</button>
                    </div>
                    <div className="containerforboxes">
                        {/* affichage des articles recuperees du back  */}
                        {articles.slice(indexOfFirstArticle, indexOfLastArticle).map((article) => (
                            <div key={article.title} className="box2">
                                <div className="boxInner">
                                    <h2 className="boxtitre" style={{ overflowWrap: 'break-word' }}>
                                        {article.title}
                                    </h2>
                                    <p className="descr">{article.summary}</p>
                                    {article.author && (
                                        <p className="Author">Author: {article.author.map((author) => `${author.name}`)}</p>
                                    )}
                                    <button className="Readmore" onClick={() => { handlepdf(article.pdf);}}>Read more</button>
                                    <button className="favori" >
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pagination1">
                        {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }, (_, index) => (
                            <button className='button-pagination1' key={index} onClick={() => handlePagination(index + 1)}>
                                🔘
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
