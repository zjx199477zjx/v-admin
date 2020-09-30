import { sessionStorage } from 'src/assets/js/storage';

const mutations = {
  SET_USER (state, user) {
    state.user = user;
    sessionStorage.setItem('user', user);
  },
  SET_TOKEN (state, token) {
    state.token = token;
    sessionStorage.setItem('token', token);
  },
  SET_PARAMS (state, info) {
    state.info = info;
     sessionStorage.setItem('info', info);
  }
};

export default mutations;

