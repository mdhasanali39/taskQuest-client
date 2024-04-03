import axios from "axios";
import { clearCookie } from "./auth";
import {signOut} from 'firebase/auth'
import auth from "../config/firebase.config";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosSecure.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // console.log("error in interceptors", err);
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      await clearCookie();
      await signOut(auth)
      window.location.replace("/login");
    }
    return Promise.reject(err);
  }
);

export default axiosSecure;
