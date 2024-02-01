import React from "react";
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';

import { BasDePage, ResultsHeader } from "../Components/SharedComponents";
import Articlecomponents from "../Components/Articlecomponents";
import { getArticleInfo, modifyArticle } from "../Services/Api";


import "../Styles/Articlepage/article.css"


const Articlemodif = () => {


 
    const authtoken = localStorage.getItem("token");
    const { id } = useParams();
    

    
    const [Titre,setTitre] = useState("article titre")
    const [Summary,setSummary] = useState("Summary")
    const [Keyword,setKeyword] = useState("key words")
    const [Authors,setAuthors] = useState([{id:'1',name:'author number 1',institution:'institution number 1', email:'email number 1'},
                                          {id:'2',name:'author number 2',institution:'institution number 2', email:'email number 2'},])
    
    
    const [Date,setDate]= useState("Date")
   
    const handlechangetitle = (event) => {
        setTitre(event.target.value);
    }
    const handlechangekeyword = (event) => {
        setKeyword(event.target.value);
    }
    const handlechangesummary = (event) => {
        setSummary(event.target.value);
    }
    
    
    const handlechangedate = (event) =>{
        setDate(event.target.value);
    }
    const handlechangeauthor = (event,authorid) => {
        setAuthors(Authors => Authors.map(author => author.id === authorid ? {...author,name: event.target.value}:author));
    }
    const handlechangeinstitution = (event,authorid) => {
       setAuthors(Authors => Authors.map(author => author.id === authorid ? {...author,institution:event.target.value}:author));
    }
    const handlechangeemail = (event,authorid) =>{
        setAuthors(Authors => Authors.map(author => author.id === authorid ? {...author,email:event.target.value}:author));
    } 


    useEffect(() => {
        const fetchArticle = async () => {
          try {
            const Articledata = await getArticleInfo(id,authtoken);
            setTitre(Articledata.title);
            setKeyword(Articledata.keywords);
            setSummary(Articledata.summary);
            setDate(Articledata.date);
            
            setAuthors(Articledata.author);
            } catch (error) {
            console.error(error);
          }
        };
        fetchArticle();
      }, [id,authtoken]);

    const addauthor = () => {
        const author = {text:'author number '+ (Authors.length+1),institution:'institution number '+(Authors.length+1),email:'email number '+(Authors.length+1)};
        setAuthors([...Authors,author]);
    }
    const valider = () => {
        const updatedarticle = {
            'id':id,
            'title':Titre,
            'summary':Summary,
            'keywords':Keyword,
            'author': Authors,
            
            'date':Date,
        }
        modifyArticle(updatedarticle.id,updatedarticle);
    }
    return ( 
        <div className="maindiv">
            <header> <ResultsHeader/> </header>
            <div className="mainsection" >
                <label id="modif">Article Modifications</label>
                <label id="title">Title</label>
                <Articlecomponents.Modifiabletextfield id={"titletextfield"} IsMod={true} onchange={handlechangetitle} content={Titre}  />
                <label id="summary">Summary</label>
                <Articlecomponents.Modifiabletextfield id={"summarytextfield"} IsMod={true} onchange={handlechangesummary} content={Summary} />
                <label id="keyword">keyword</label>
                <Articlecomponents.Modifiabletextfield id={"keywordtextfield"} IsMod={true} onchange={handlechangekeyword} content={Keyword} />
                
                
                {Authors.map(author => (
                    <div>
                        
                    <label id="author">Author</label>
                    <Articlecomponents.Modifiabletextfield id="authortextfield" IsMod={true} onchange={e=>handlechangeauthor(e,author.id)} content={author.name} />
                    <label id="institution">Institution</label>
                    <Articlecomponents.Modifiabletextfield id="institutiontextfield" IsMod={true} onchange={e=>handlechangeinstitution(e,author.id)} content={author.institution} />
                    <label id="e-mail">E-mail</label>
                    <Articlecomponents.Modifiabletextfield id="emailtextfield" IsMod={true}  onchange={e=>handlechangeemail(e,author.id)} content={author.email} />
                    </div>
                ))}
                <button id="addauthor" onClick={( )=>{
                    addauthor()
                }}>
                   + Add author
                </button>
                
               
                <label id="date">Date</label>
                <Articlecomponents.Modifiabletextfield id={"datetextfield"} IsMod={true} onchange={handlechangedate} content={Date} />
                <button id="save" onClick={() => {
                    valider()
                }}>
                    Save changes
                </button>
            </div>
            <footer> <BasDePage/> </footer>
        </div>
     );
}
 
export default Articlemodif;