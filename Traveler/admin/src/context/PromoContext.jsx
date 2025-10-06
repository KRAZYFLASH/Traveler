import { createContext } from "react";

export const PromoContext = createContext();


const PromoContextProvider = (props) => {

    const value = {

    }

    return (
        <PromoContext.Provider value={{value}}>
            {props.children}
        </PromoContext.Provider>
    )
}

export default PromoContextProvider;
