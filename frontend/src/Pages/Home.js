import React from "react";
import { Acceuil2, Discover, ScholarHub} from "../Components/HomeComponents";
import { BasDePage } from "../Components/SharedComponents";


function Home() {
    return (
      <div className="Home">
      <ScholarHub  />
       <Acceuil2 /> 
       <Discover />
       <BasDePage />
      
      </div>
    );
  }
  
  export default Home;
  