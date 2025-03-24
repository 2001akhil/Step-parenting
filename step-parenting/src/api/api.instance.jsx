import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://step-parenting.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
