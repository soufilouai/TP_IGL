import React from "react";
import { BasDePage } from "../Components/SharedComponents";
import { Filtres } from "../Components/ResultsComponents";
import { Enteteadmin } from "../Components/ResultsAdmin";


function ResultatsAd() {
  return (
    <div className="Resultatsadmin">
      <Enteteadmin />
      <Filtres />
      <BasDePage />
    </div>
  );
}

export default ResultatsAd;