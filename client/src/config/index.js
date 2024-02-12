import axios from "axios";

// const instance = axios.create({
//   baseURL: `http://localhost:3001/api/v1`,
// });

const instance = axios.create({
  baseURL: `https://backend-social-media-ajbq.onrender.com/api/v1`,
});

export default instance;
