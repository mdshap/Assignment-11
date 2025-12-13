import axios from "axios";

const axiosProvider = axios.create({
  baseURL: "http://localhost:3000",

});

export default axiosProvider;