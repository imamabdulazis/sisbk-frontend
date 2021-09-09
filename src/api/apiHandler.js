import axios from "axios";

export default axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000",
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});
