import React from "react";
import { Recherche} from "../Components/SearchAdmin";
import { BasDePage } from "../Components/SharedComponents";

function SearchAdmin() {
    return (
      <div className="SearchAd">
        <Recherche />
        <BasDePage />
      </div>
    );
  }
  
  export default SearchAdmin;