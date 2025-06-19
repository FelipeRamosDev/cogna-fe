import axios from 'axios';

export default (API_ROOT, options) => axios.create({
   baseURL: API_ROOT || process.env.API_ROOT || 'http://localhost:8000',
   withCredentials: true,
   ...options
});
