import axios from 'axios';

console.log('API Root Externla:', process.env.NEXT_PUBLIC_API_ROOT);
const useAjax = () => {
   console.log('API Root:', process.env.NEXT_PUBLIC_API_ROOT);

   return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ROOT,
      timeout: 30000
   });
};

export default useAjax;