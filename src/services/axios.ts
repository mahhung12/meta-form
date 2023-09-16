import axios from 'axios';

import useAuthenticationStore from 'store/authentication/useAuthenticationStore';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.interceptors.request.use(
  async function (axios_config: any) {
    const token = useAuthenticationStore.getState().token;

    axios_config.headers.Authorization = `Bearer ${token}`;
    return axios_config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axios;
