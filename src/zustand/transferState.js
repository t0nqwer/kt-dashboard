import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";
import { uploadTransferConfirmDoc } from "../function/uploadimage";

const useTransferStore = create((set) => ({
  loading: false,
  storeList: [],
  products: [],
  from: "",
  to: "",
  transferList: [],
  confirmId: "",
  setConfirmId: (data) => {
    set((state) => ({
      ...state,
      confirmId: data,
    }));
  },
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
  confirmTransfer: async (Id, File) => {
    set((state) => ({ ...state, loading: true }));
    try {
      const imagedata = await uploadTransferConfirmDoc(Id, File);
      console.log(imagedata);
      const { data } = await axios.post(`${url}/transfer/confirm`, {
        transferId: Id,
        file: imagedata,
      });
      set((state) => ({
        ...state,
        loading: false,
        transferList: data,
      }));
    } catch (error) {}
  },
}));

export default useTransferStore;
