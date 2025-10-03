import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

import { airlines, promos } from "../src/assets/data/assets";

const AppContextProvider = (props) => {


    const value = {
        airlines,
        promos
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider