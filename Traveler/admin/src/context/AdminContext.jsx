import { useState } from "react";
import { createContext } from "react";

export const AdminContext = createContext();


const AdminContextProvider = (props) => {
    const [Atoken, setAtoken] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    // ✅ DEBUG LOG
    console.log("Environment variables:", import.meta.env);
    console.log("Backend URL:", backendUrl);

    const value = {
        Atoken,
        setAtoken,
        backendUrl
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
