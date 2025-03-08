import axios from 'axios';

const axiosInstance = axios.create({

  baseURL: 'https://localhost:7086/api'

});

export default axiosInstance;