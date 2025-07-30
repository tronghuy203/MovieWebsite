import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { getLogoutSuccess } from "./redux/authSlice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (err, token = null) => {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshToken = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/v1/auth/refresh",
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createAxios = (user, dispatch, statusSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      if (!user?.accessToken) return config;

      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const data = await refreshToken();
            const refreshUser = {
              ...user,
              accessToken: data.accessToken,
            };
            dispatch(statusSuccess(refreshUser));
            config.headers["token"] = "Bearer " + data.accessToken;
          } catch (error) {
            processQueue(error, null);
            dispatch(getLogoutSuccess());
            return Promise.reject(error);
          } finally {
            isRefreshing = false;
          }
        } else {
          return new Promise((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                config.headers["token"] = "Bearer " + token;
                resolve(config);
              },

              reject: (err) => reject(err),
            });
          });
        }
      } else {
        config.headers["token"] = "Bearer " + user?.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
