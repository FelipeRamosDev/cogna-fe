import { createContext, useContext, useState, useEffect } from 'react';
import Ajax from '../services/AJAX';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/common/Spinner/Spinner';

/**
 * React Context for authentication state and loading status.
 * Provides user and loading state to consumers.
 * @type {React.Context<{user: object|null, loading: boolean}>}
 */
const AuthContext = createContext();

/**
 * AuthProvider component for managing authentication state and user session.
 * Fetches user info on mount, handles loading and redirect logic, and provides context to children.
 *
 * @param {object} props
 * @param {object|null} [props.loadedUser] - User object if already loaded (SSR/SSG).
 * @param {boolean} [props.renderIfLoading] - If true, renders children even while loading.
 * @param {boolean} [props.redirectLogin] - If true, redirects to /login if not authenticated.
 * @param {string} [props.spinnerHeight] - Height for the loading spinner.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element}
 */
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

/**
 * Custom hook to access authentication context values.
 *
 * @returns {{user: object|null, loading: boolean}}
 */
export function useAuth() {
   return useContext(AuthContext);
}

export default AuthContext;
