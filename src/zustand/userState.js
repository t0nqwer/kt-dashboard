import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { url } from "../assets/public";
import { notify, notifySuccess } from "../function/notification";
import axios from "axios";
const UserState = persist(
  (set) => ({
    loading: false,
    user: null,
    token: null,
    setLoading: (value) => set((state) => ({ ...state, loading: value })),
    Login: async (name, password) => {
      set((state) => ({ ...state, loading: true }));
      try {
        const response = await axios.post(`${url}/user/login`, {
          name,
          password,
        });
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
        console.log(error.response.data.error);
        notify(error.response.data.error);
      }
    },
    Logout: () => {
      set((state) => ({
        ...state,
        user: null,
        token: null,
      }));
    },
  }),
  { name: "user" }
);
const useUserState = create(UserState);
export default useUserState;
