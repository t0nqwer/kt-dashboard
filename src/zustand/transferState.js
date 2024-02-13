import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";

const useTransferStore = create((set) => ({
  loading: false,
  storeList: [],
  products: [],
  from: "",
  to: "",
  transferList: [],
  fetchProduct: async (store) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const { data } = await axios.get(`${url}/product/all`);
      set((state) => ({
        ...state,
        loading: false,
        products: data,
      }));
    } catch (error) {
      console.log(error.response.data.error);
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
  fetchStore: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const { data } = await axios.get(`${url}/store`);
      const stores = data
        .filter(
          (store) =>
            store.closeDate === null || new Date(store.closeDate) > new Date()
        )
        .map((store) => store.name);

      set((state) => ({
        ...state,
        loading: false,
        storeList: stores,
      }));
    } catch (error) {
      console.log(error.response.data.error);
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
  setFrom: (data) => {
    set((state) => ({
      ...state,
      from: data,
    }));
  },
  setTo: (data) => {
    set((state) => ({
      ...state,
      to: data,
    }));
  },
  fetchTransferList: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const { data } = await axios.get(`${url}/transfer`);
      console.log(data);
      set((state) => ({
        ...state,
        loading: false,
        transferList: data,
      }));
    } catch (error) {
      console.log(error.response.data.error);
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
}));

export default useTransferStore;
