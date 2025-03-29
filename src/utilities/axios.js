import axios from "axios";

const authToken = localStorage.getItem('token') || ""

const axiosInstance = axios.create({
    baseURL: 'https://reqres.in/api/',
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar', 
        'Authorization': `Bearer ${authToken}`
    }, 
  });


  export default axiosInstance