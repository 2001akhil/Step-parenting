import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'http://changeURL/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance