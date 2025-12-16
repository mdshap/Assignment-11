import axios from "axios";

const axiosProvider = axios.create({
  baseURL: "https://assignment-11-sever.onrender.com",

});

export default axiosProvider;