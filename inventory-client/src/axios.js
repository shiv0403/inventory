import axios from "axios";

const prod_url = "https://bisell-backend.herokuapp.com/v1";
const dev_url = "http://localhost:5000/";

export default axios.create({
  baseURL: dev_url,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});
