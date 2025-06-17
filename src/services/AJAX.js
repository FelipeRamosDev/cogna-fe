import axios from 'axios';

const AJAX = axios.create({
   baseURL: process.env.API_ROOT || 'http://localhost:8000',
   timeout: 30000
});

export default AJAX;
