import React from "react";
import { Recherche} from "../Components/SearchComponents";
import { BasDePage } from "../Components/SharedComponents";

function Search() {
    return (
      <div className="Search">
        <Recherche />
        <BasDePage />
      </div>
    );
  }
  
  export default Search;
  