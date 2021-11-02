import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://sisbk-backend.herokuapp.com",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
