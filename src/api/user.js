import Vue from 'vue';
import axios from '../_services/axios';
import { LOGIN_URL, REGISTER_URL, GET_ME_URL } from './url';
import APIService from './service';

export const signInWithEmailAndPassword = async (email, password) => {
  let data = {};
  await axios
    .post(LOGIN_URL, { email, password })
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      throw new Error(`[ERR] UserApi: ${err}`);
    });

  return data;
};

export const signUp = async (data) => {
  try {
    const res = await axios.post(REGISTER_URL, data);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const setupLoggedInUser = (router, store) => {
  Vue.prototype.$http = axios;
  const token = Vue.$cookies.get('token');

  if (token) {
    Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

    // Check token is expired
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          store.dispatch('user/logout');
          return router.go({ name: 'login' });
        }
        return error;
      },
    );
  }
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const setToken = ({ token, user }) => {
  setUser(user);
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getMe = async () => {
  let user = {};

  try {
    await APIService.get(GET_ME_URL).then((data) => {
      user = data.data;
    });
    return user;
  } catch (err) {
    throw new Error('[ERR] UserService: ', err);
  }
};
