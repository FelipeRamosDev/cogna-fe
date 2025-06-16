import axios from 'axios';

const useAjax = () => {
   return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_ROOT,
      timeout: 30000
   });
};

export default useAjax;