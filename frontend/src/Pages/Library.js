import React from "react";
import { BasDePage } from "../Components/SharedComponents";
import { ResultsHeader } from "../Components/SharedComponents";
import { Filtres } from "../Components/LibraryComponents";


function Library() {
    return (
        <div className="Library">
            <ResultsHeader />
            <Filtres />
            <BasDePage />
        </div>
    );
}

export default Library;