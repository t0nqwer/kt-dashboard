import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { url } from "../assets/public";
import { notify, notifySuccess } from "../function/notification";
import axios from "axios";
const UserState = persist(
  (set, get) => ({
    loading: false,
    user: null,
    token: null,
    setLoading: (value) => set((state) => ({ ...state, loading: value })),
    Login: async (name, password) => {
      const baseOptions: AxiosRequestConfig = {
        proxy: false,
        httpsAgent: "http://157.245.195.154/",
        httpAgent: " http://157.245.195.154/",
      };

      set((state) => ({ ...state, loading: true }));
      try {
        const response = await axios.post(
          `${url}/user/login`,
          {
            username: name,
            password,
          },
          baseOptions
        );
        if (response.data.user) {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.user.token}`;
          axios.defaults.headers.common[
            "Username"
          ] = `${response.data.user.username}`;
        }
        set((state) => ({
          ...state,
          user: response.data.user,
          token: response.data.token,

          loading: false,
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          loading: false,
        }));
        console.log(error.response.data.message);
        notify(error.response.data.message);
      }
    },
    Logout: () => {
      set((state) => ({
        ...state,
        user: null,
        token: null,
      }));
    },
    checkTokenStatus: async () => {
      const token = get().token;
      set((state) => ({ ...state, loading: true }));

      if (!token) {
        set((state) => ({ ...state, loading: false }));
        return;
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Username"] = `${get().user.username}`;
      try {
        const response = await axios.get(`${url}/user/checkTokenStatus`);

        set((state) => ({
          ...state,
          loading: false,
        }));
      } catch (error) {
        console.log(error);
        set((state) => ({
          ...state,
          user: null,
          token: null,
          loading: false,
        }));
      }
    },
  }),
  { name: "user" }
);
const useUserState = create(UserState);
export default useUserState;
