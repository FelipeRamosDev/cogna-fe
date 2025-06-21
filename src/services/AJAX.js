import axios from 'axios';

/**
 * Creates an Axios instance for making HTTP requests to the backend API.
 *
 * @param {string} [API_ROOT] - Base URL for the API. Defaults to process.env.API_ROOT or 'http://localhost:8000'.
 * @param {object} [options] - Additional Axios configuration options.
 * @returns {import('axios').AxiosInstance} Configured Axios instance.
 */
export default function AJAX(API_ROOT, options) {
   return axios.create({
      baseURL: API_ROOT || process.env.API_ROOT || process.env.NEXT_PUBLIC_API_ROOT || 'http://localhost:8000',
      withCredentials: true,
      timeout: 30000,
      ...options
   });
}
