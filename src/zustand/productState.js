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

const useProductStore = create((set) => ({
  loading: false,
  singledata: null,
  pageAll: 0,
  product: [],
  error: null,
  query: [],
<<<<<<< HEAD
  addData: null,
  productData: {},
=======
  adddata: null,

>>>>>>> 342068fa3071bf3c82daef192e88135f1c087748
  setProduct: (data) => set((state) => ({ ...state, product: data })),
  fetchProduct: async (page, search) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(
        `${url}/product/khwanta?page=${page}&search=${search}`
      );
      set({
        loading: false,
        product: data.data,
        pageAll: data.page,
        singledata: null,
        query: data.query,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  fetchClothProduct: async (page, search, query) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(
        `${url}/product/cloth?page=${page}&search=${search}&query=${query}`
      );
      set({
        loading: false,
        product: data.data,
        pageAll: data.page,
        singledata: null,
        query: data.query,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  fetchExampleProduct: async (page, search) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(
        `${url}/product/example?page=${page}&search=${search}`
      );
      set({
        loading: false,
        product: data.data,
        pageAll: data.page,
        singledata: null,
        query: data.query,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  fetchSingleCloth: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/cloth/${id}`);
      set({
        loading: false,
        product: [],
        pageAll: null,
        singledata: data.data,
        query: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  fetchSingleExample: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/example/${id}`);
      set({
        loading: false,
        product: [],
        pageAll: null,
        singledata: data.data,
        query: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  fetchSingleKhwanta: async (id) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/khwanta/${id}`);
      console.log(data);
      set({
        loading: false,
        product: [],
        pageAll: null,
        singledata: data.data,
        query: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  getAddProduct: async () => {
<<<<<<< HEAD
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/addproduct`);
      console.log(data);
      set({
        loading: false,
        product: [],
        pageAll: null,
        addData: data,
        query: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
=======
    set((state)=>({...state, loading: true }));
    try {
      const { data } = await axios.get(`${url}/design/addDesign`);
      set((state) => ({
        ...state,
        loading: false,
        adddata: data,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
    }
    },
>>>>>>> 342068fa3071bf3c82daef192e88135f1c087748
  addProduct: async (product) => {},
  addClothProduct: async (product) => {},
  addExampleProduct: async (product) => {},
  deleteProduct: async (id) => {},
  updatePrice: async (id, price) => {},
  addDetailImage: async (id, image) => {},
  deleteDetailImage: async (id, image) => {},
}));

export default useProductStore;
