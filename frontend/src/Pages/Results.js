import React from "react";
import { BasDePage } from "../Components/SharedComponents";
import { ResultsHeader } from "../Components/SharedComponents";
import { Filtres } from "../Components/ResultsComponents";


function Resultats() {
  return (
    <div className="Resultats">
      <ResultsHeader />
      <Filtres />
      <BasDePage />
    </div>
  );
}

export default Resultats;
