"use client";

import {createContext, useContext} from "react";



export const ModuleContext = createContext({
    name: "",
    urlBase: "/",
});

export const useModule = () => {
  return useContext(ModuleContext);
}

export function ModuleProvider({name, urlBase, children}) {

    const value = {
        name: name,
        urlBase: urlBase
    }
    return (
        <ModuleContext.Provider value={value}>
            {children}
        </ModuleContext.Provider>
    )
}