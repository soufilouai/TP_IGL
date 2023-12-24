import React from "react";
import { ScholarHub, Acceuil2, ApercuHome} from "../Components/HomeComponents";
import { BasDePage } from "../Components/SharedComponents";



function Home() {
    return (
      <div className="Home">
        <ScholarHub  />
        <Acceuil2 />
        <ApercuHome />
        <BasDePage />

      </div>
    );
  }
  
  export default Home;
  