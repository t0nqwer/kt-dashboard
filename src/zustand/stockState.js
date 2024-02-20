import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";
import { notify } from "../function/notification";

const useStockState = create((set) => ({
  loading: false,
  stock: [],
  fetchStockByshop: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${url}/stock/byshop`);
      console.log(Object.keys(res.data));
      set({ stock: res.data, loading: false });
    } catch (error) {
      notify("ไม่สามารถดึงข้อมูลสต๊อคสินค้าได้...");

      set({ error: error.response.data.message, loading: false });
    }
  },
  fetchStockByProduct: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${url}/stock/byproduct`);
      set({ stock: res.data, loading: false });
    } catch (error) {
      notify("ไม่สามารถดึงข้อมูลสต๊อคสินค้าได้...");
      set({ error: error.response.data.message, loading: false });
    }
  },
}));

export default useStockState;
