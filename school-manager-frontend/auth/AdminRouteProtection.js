import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

export default function  AdminRouteProtection({ children }){
    const router = useRouter();
    const { authenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/');
        } else {
            router.push('/access-denied');
        }
    }, [isAuthenticated, role, router]);

    if (!isAuthenticated || role !== 'admin') {
        return null; // Ou un écran de chargement, un message d'erreur, etc.
    }

    return <>{children}</>;
};

/*
import AdminRouteProtection from './AdminRouteProtection';

const AdminPage = () => {
  return (
    <AdminRouteProtection>
      {/!* Contenu accessible uniquement aux administrateurs *!/}
    </AdminRouteProtection>
  );
};

export default AdminPage;*/


/*
Vous pouvez créer des composants similaires pour d'autres rôles ou
des conditions d'autorisation plus complexes selon vos besoins.
*/



///    Affichage conditionnel des éléments d'interface utilisateur

/*
    import { useAuth } from './AuthContext';

const DeleteButton = () => {
    const { role } = useAuth();

    if (role === 'admin') {
        return <button>Supprimer</button>;
    }

    return null;
};

export default DeleteButton;

*/
