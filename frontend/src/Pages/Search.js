import React from "react";
import { BarreRecherche } from "../Components/SearchComponents";
import { BasDePage } from "../Components/SharedComponents";
import { Discover } from "../Components/SearchComponents";

function Search() {
    return (
      <div className="Search">
        <BarreRecherche />
        <Discover />
        <BasDePage />
      </div>
    );
  }
  
  export default Search;