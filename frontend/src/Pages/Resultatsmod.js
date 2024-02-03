import React from "react";
import { BasDePage, ResultsHeader } from "../Components/SharedComponents";
import { Filtres } from "../Components/ResultsComponents";
import { Enteteadmin } from "../Components/ResultsAdmin";
import { Filtresmod } from "../Components/ResultsMod";


function ResultatsMod() {
  return (
    <div className="Resultatsmod">
      <ResultsHeader />
      <Filtresmod />
      <BasDePage />
    </div>
  );
}

export default ResultatsMod;