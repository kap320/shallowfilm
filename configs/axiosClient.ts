import axios from "axios";
import queryString from "query-string";
import { server } from "./server";

const axiosClient = axios.create({
  baseURL: server,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    const { response } = error;
    const errorResult = { ...response.data, status: response.status };
    return Promise.reject(errorResult);
  }
);

export default axiosClient;
