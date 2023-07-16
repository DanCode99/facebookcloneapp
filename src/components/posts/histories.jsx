import React from "react";
import { HistoriesData } from "../data/historiesData";

export const Histories = () => {
    
    return (
        <div className="histories">
            {HistoriesData.map((hist) =>
            <div className="hist-item" key={hist.id}>
                <img src={hist.image} className="hist-img"/>
                <p className="hist-author">{hist.author}</p>
            </div> 
            )}
        </div>
    )
}