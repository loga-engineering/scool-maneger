import { createContext, useContext } from 'react';
import {useRecoilValue} from "recoil";
import {isAuthenticated} from "@/features/authentication/auth-service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const [session, loading] = useSession();
    //
    // // Vérifier si l'utilisateur est authentifié et a un rôle
    // const isAuthenticated = !!session;
    // const role = session?.user?.role;
    const authenticated = useRecoilValue(isAuthenticated);


    return (
        <AuthContext.Provider value={{ authenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

/*

En utilisant ce contexte d'authentification, vous pouvez contrôler l'accès aux différentes parties
de votre application en fonction du rôle de l'utilisateur.*/
