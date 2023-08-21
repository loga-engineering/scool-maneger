"use client";

import {createContext, useContext, useState} from "react";



export const ModuleContext = createContext();


export const useModule = () => {
  return useContext(ModuleContext);
}

export function ModuleProvider({ children }) {
    const [parameter, setParameter] = useState("");

    return (
        <ModuleContext.Provider value={{ parameter, setParameter }}>
            {children}
        </ModuleContext.Provider>
    )
}