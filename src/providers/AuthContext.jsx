import { createContext, useContext, useState, useEffect } from 'react';
import Ajax from '../services/AJAX';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/common/Spinner/Spinner';

const AuthContext = createContext();

export function AuthProvider({ loadedUser, renderIfLoading, redirectLogin, spinnerHeight, children }) {
   const [ user, setUser ] = useState(loadedUser || null);
   const [ loading, setLoading ] = useState(loadedUser ? false : true);
   const router = useRouter();
   const ajax = Ajax(process.env.CLIENT_API_ROOT);

   useEffect(() => {
      if (user) {
         return;
      }

      ajax.get('/auth/user').then(response => {
         setUser(response.data);
      }).catch((err) => {
         setUser(null);
      }).finally(() => {
         setLoading(false);
      });
   }, []);

   if (loading && !renderIfLoading) {
      return <Spinner height={spinnerHeight} />;
   }

   if (!user && redirectLogin && !renderIfLoading) {
      router.push('/login');
      return <></>;
   }

   return (
      <AuthContext.Provider value={{ user, loading }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   return useContext(AuthContext);
}

export default AuthContext;
