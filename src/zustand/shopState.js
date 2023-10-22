import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";

import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";

const useShopState = create((set) => ({
  loading: false,
  Shop: [],
  res: {},
  getShop: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${url}/store`);
      set({ Shop: res.data, loading: false });
    } catch (error) {
      set({ error: error.response.data.message, loading: false });
    }
  },
  addShop: async (data) => {
    set({ loading: true });

    const file = data.image;
    const fileRef = ref(storage, `Shop/${data.name}`);

    uploadBytes(fileRef, file).then(async (downloadURL) => {
      const getURL = await getDownloadURL(downloadURL.ref);
      try {
        const res = await axios.post(`${url}/store/create`, {
          ...data,
          image: getURL,
        });

        set((state) => ({
          ...state,
          loading: false,
          res: res.data,
        }));
      } catch (error) {
        deleteObject(ref(storage, getURL)).then(() => {
          set((state) => ({
            ...state,
            error: error.response.data.message,
            loading: false,
          }));
        });
      }
    });
  },
  editShop: async (data) => {
    const res = await axios.put(`${url}/shop`, data);
    set({ Shop: res.data });
  },
}));

export default useShopState;
