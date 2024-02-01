import React from "react"
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import '../CSS/Css1.css';
import '../CSS/Css2.css'
import '../CSS/Css3.css'
import LibImage from "../images/mylib.png"


export const Filtres = () => {
    const [inputValue, setInputValue] = useState('');
    const [articlesfiltres, setArticlesFiltres] = useState([]);
    const [inputValue2, setInputValue2] = useState('');
    const [selectedButtons, setSelectedButtons] = useState([]);
    const history = useHistory();
    const [articles, setArticles] = useState([]);

    const handleButtonClick = (buttonId) => {
        setSelectedButtons((prevButtons) => {
            if (prevButtons.includes(buttonId)) {
                return prevButtons.filter((id) => id !== buttonId);
            } else {
                return [...prevButtons, buttonId];
            }
        });
    };
    useEffect(() => {
        console.log("Updated state:", selectedButtons);
    }, [selectedButtons]);

    const handleRequete = async () => {
        setSelectedButtons([...selectedButtons, inputValue, inputValue2]);
        console.log("Liste des filtres:", selectedButtons);
        try {
            const apiUrl = "http://localhost:8000/api/articles/filters/";
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Origin: "http://localhost:3000",
                },
                body: JSON.stringify({ keywords: selectedButtons }),
            });

            if (!response.ok) {
                console.log("Erreur");
                return;
            }
            const data = await response.json();
            const parsedData = JSON.parse(data);
            setArticlesFiltres(parsedData);
            console.log("les articles filtres", articlesfiltres);
            history.push({
                pathname: "/Resultats",
                state: { articles: parsedData },
            });
            console.log("afficher les articles filtres", articles);
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
        }
    };

    useEffect(() => {
        console.log("Updated state2:", selectedButtons);
    }, [selectedButtons]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl2 = "http://localhost:8000/api/articles/favoris/";
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
                setArticles(parsedData2);
                console.log("les articles favoris", articles);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles favoris:", error);
            }
        };
        fetchData();  /* just to make sure on a eu les articles */
    });

    return (
        <div>
            <div className="resultrecherche">
                <img src={LibImage} alt="Mylibrary" className="librimage" />
                <div className="results_filtres">
                    <div className="box-filtre">
                        <div >
                            <p className="filter-titre">Filter results </p>
                        </div>
                        <div className="sort">
                            <button className="date-sort" style={{ color: selectedButtons.includes('keywords') ? '#B08B56' : 'black' }} onClick={() => handleButtonClick('keywords')}>• Sort by keywords</button>
                            <button className="date-sort" style={{ color: selectedButtons.includes('authors') ? '#B08B56' : 'black' }} onClick={() => handleButtonClick('authors')}>•Sort by authors </button>
                            <button className="date-sort" style={{ color: selectedButtons.includes('institution') ? '#B08B56' : 'black' }} onClick={() => handleButtonClick('institution')}>•Sort by institutions</button>
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
                                    <button className="favori" >
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
