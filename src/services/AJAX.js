import axios from 'axios';

const AJAX = axios.create({
   baseURL: process.env.API_ROOT || process.env.API_ROOT_NEXT_PUBLIC || 'http://localhost:8000',
   timeout: 30000
});

export default AJAX;
