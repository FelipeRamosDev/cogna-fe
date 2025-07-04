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
 * @param {boolean} [props.noSpinner] - If true, does not show loading spinner.
 * @param {boolean} [props.renderIfLoading] - If true, renders children even while loading.
 * @param {boolean} [props.redirectLogin] - If true, redirects to /login if not authenticated.
 * @param {string} [props.spinnerHeight] - Height for the loading spinner.
 * @param {boolean} [props.notAuthRender] - If true, renders children when not authenticated.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element}
 */
export function AuthProvider({
   loadedUser,
   noSpinner = false,
   renderIfLoading = false,
   redirectLogin = false,
   spinnerHeight,
   spinnerSize,
   notAuthRender = false,
   children
}) {
   const [ user, setUser ] = useState(loadedUser || null);
   const [ loading, setLoading ] = useState(loadedUser ? false : true);
   const isRender = user || notAuthRender || renderIfLoading;
   const router = useRouter();
   const ajax = Ajax();

   const login = async (email, password) => {
      try {
         const loginUser = await ajax.post('/auth/login', { email, password });

         if (!loginUser.data.success) {
            throw loginUser;
         }

         router.push('/meu-perfil');
         return loginUser.data;
      } catch (error) {
         const errorData = error.response ? error.response.data : error;
         return errorData;
      }
   };

   const register = async (data) => {
      try {
         const registerUser = await ajax.put('/auth/cadastro', data);

         if (!registerUser.data.success) {
            const errorData = registerUser.response ? registerUser.response.data : registerUser;
            return errorData;
         }

         router.push('/meu-perfil');
         return registerUser.data;
      } catch (error) {
         const errorData = error.response ? error.response.data : error;
         return errorData;
      }
   };

   const logout = async () => {
      try {
         const logoutUser = await ajax.post('/auth/logout');

         if (!logoutUser.data.success) {
            throw logoutUser;
         }

         setUser(null);
         router.push('/');
         return logoutUser.data;
      } catch (error) {
         const errorData = error.response ? error.response.data : error;
         return errorData;
      }
   }

   useEffect(() => {
      if (user) {
         return;
      }

      ajax.get('/auth/user').then(response => {
         if (!response.data.success) {
            throw response.data;
         }

         setUser(response.data.user);
      }).catch((err) => {
         setUser(null);
      }).finally(() => {
         setLoading(false);
      });
   }, []);

   if (loading && !renderIfLoading && !noSpinner) {
      return <Spinner wrapperHeight={spinnerHeight} size={spinnerSize} />;
   }

   if (!user && redirectLogin) {
      router.push('/login');
   }

   return (
      <AuthContext.Provider value={{ user, loading, login, register, logout }}>
         {isRender && children}
      </AuthContext.Provider>
   );
}

/**
 * Custom hook to access authentication context values.
 *
 * @returns {{user: object|null, loading: boolean, login: function, register: function, logout: function}}
 */
export function useAuth() {
   return useContext(AuthContext);
}

export default AuthContext;
