import axios from 'axios';

const AJAX = axios.create({
   baseURL: process.env.API_ROOT,
   timeout: 10000
});

export default AJAX;
