import { create } from 'zustand';

const useAuthStore = create(set => ({
  dataLogin: {},
  isLogin: false,
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expiredToken');
    set({
      isLogin: false,
    });
  },
  checkLogin: () => {
    let user = JSON.parse(localStorage.getItem('user'));
    let tokenExpiration = JSON.parse(localStorage.getItem('expiredToken'));
    if (tokenExpiration == null) {
      user = localStorage.removeItem('user');
      set({
        isLogin: false,
      });
    }
    const sekarang = Math.floor(Date.now() / 1000);
    const validToken = sekarang < tokenExpiration;
    if (!validToken) {
      user = localStorage.removeItem('user');
      tokenExpiration = localStorage.removeItem('expiredToken');
      set({
        isLogin: false,
      });
    } else {
      set({
        isLogin: true,
      });
      return user;
    }
    if (user == null) {
      set({
        isLogin: false,
      });
    } else {
      set({
        isLogin: true,
      });
      return user;
    }
  },
  getInfoLogin: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      set({
        dataLogin: user.data,
      });
    }
  },
}));

export default useAuthStore;
