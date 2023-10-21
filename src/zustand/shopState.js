import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";

const useShopState = create((set) => ({
  Shop: [],
  getShop: async () => {
    const res = await axios.get(`${url}/shop`);
    set({ Shop: res.data });
  },
  addShop: async (data) => {
    const res = await axios.post(`${url}/shop`, data);
    set({ Shop: res.data });
  },
  editShop: async (data) => {
    const res = await axios.put(`${url}/shop`, data);
    set({ Shop: res.data });
  },
}));

export default useShopState;
