import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../CSS/Css1.css';
import '../CSS/Css2.css'
import '../CSS/Css3.css'
import resultsImage from "../images/results.png"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import blacklogo from "../images/logoblack.png"
import frame1 from "../images/frame1.png"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import iconsearch from "../images/searchicon.png"
import axios from 'axios'
import React, { useRef } from 'react';

export const Enteteadmin = () => {

    const [motsCles, setMotsCles] = useState("");
    const [articles, setArticles] = useState([]);
    const [showContent, setShowContent] = useState(false);

    const [file , setFile] = useState(null);
    const [progress , setProgress] = useState( {started : false , pc : 0})
    const [msg , setMsg] = useState()

    // function handleupload() {
    //     if (!file) {
    //         console.log("No file selected");
    //         return
    //     }
    //     const pdf_path = new FormData();
    //     pdf_path.append('file',file);

    //     )


    // }

    const location = useLocation();
    const usernameinput = location.state ? location.state.username : null;
    const email = location.state ? location.state.email : null;


        const fileInputRef = useRef(null);

        const handleUploadClick = () => {
            // Trigger click on the file input
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          };
          
          const handleFileChange = async (event) => {
            // Handle file selection here
            const selectedFile = event.target.files[0];
            
            if (selectedFile) {
              // Create a FormData object to send the file
              const formData = new FormData();
              formData.append('pdf_file', selectedFile);
          
              // Perform any additional actions with the selected file
              const apiUrl = "http://localhost:8000/api/articles/upload/";
              try {
                const response = await fetch(apiUrl, {
                  method: "POST",
                  body: formData,
                  headers: {
                    // No need to set Origin header for CORS, the browser will handle it
                  },
                });
          
                if (response.ok) {
                  const data = await response.json();
                  console.log("File uploaded successfully:", data);
                } else {
                  console.error("File upload failed. Server returned:", response.status, response.statusText);
                }
              } catch (error) {
                console.error("Error uploading file:", error);
              }
            }
          };


    /*********** getting articles du backend pour les resultats de la recherche ******************/
    const history = useHistory();
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
            /**************************redirect to results page ******************/
            history.push({
                pathname: "/Resultats/",
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

    return (
        <div className="resultatsPage">
            <header className='main_header'>
                <div className='container'>
                    <img src={blacklogo} alt='Icone' className='logo' />
                    <button className='boutton-image-recherche' onClick={handleRecherche}>
                        <img src={iconsearch} alt='Icone' className='searchimage' />
                    </button>
                    <div>
                        <div className='searchbar'>
                            <input type="text" placeholder="Search.." className="header-search" value={motsCles} onChange={(e) => setMotsCles(e.target.value)} />
                        </div>
                    </div>
                    <div>
                    <button  className="buttonupload" style={{ color: '#393731', whiteSpace: 'nowrap' }} onClick={handleUploadClick}>Upload article</button>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf"/>
                    </div>
                    <button className="buttonmod" style={{ color: '#393731', whiteSpace: 'nowrap' }}>Moderator management </button>
                    <Link to='/library/'>
                        <button className='buttonlib' style={{ color: '#393731', whiteSpace: 'nowrap' }}>
                            ☆My library
                        </button>
                    </Link>
                    <button className='buttonacc' style={{ color: '#393731', whiteSpace: 'nowrap' }} onClick={() => { setShowContent(!showContent) }} >
                        𝘃 My account
                    </button>
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
            </header >

        </div >
    )
}