import React from "react";
import { BarreDeRecherche } from "../Components/SearchComponents";
import { BasDePage } from "../Components/SharedComponents";
import { Discoverrech } from "../Components/SearchComponents";

function Search() {
    return (
      <div className="Search">
        <BarreDeRecherche />
        <Discoverrech />
        <BasDePage />
      </div>
    );
  }
  
  export default Search;
  