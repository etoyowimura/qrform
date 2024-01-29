import axios from "axios";

  const instance = axios.create({
  baseURL: "http://10.10.10.37:3000/api/v1/",
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

instance.defaults.headers.common["Authorization"] = `Token 26e9e57d7635fd19bc165c7158a60f87f8be5995`;

export default instance;                                                                    