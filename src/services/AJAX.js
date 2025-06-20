import axios from 'axios';

export default function AJAX(API_ROOT, options) {
   return axios.create({
      baseURL: API_ROOT || process.env.API_ROOT || 'http://localhost:8000',
      withCredentials: true,
      timeout: 30000,
      ...options
   });
}
