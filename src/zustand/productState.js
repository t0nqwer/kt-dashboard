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
import { uploadproductimage } from "../function/uploadimage";
import { notify } from "../function/notification";

const useProductStore = create((set, get) => ({
  loading: false,
  singledata: null,
  pageAll: 0,
  product: [],
  error: null,
  query: [],
  addData: null,
  productData: {},
  res: {},

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
      console.log(data.products);
      set({
        loading: false,
        product: data.products,
        pageAll: data.pagecount,
        singledata: null,
        query: data?.query,
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
        res: {},
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
        singledata: data,
        query: null,
        res: {},
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
        res: {},
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
        res: {},
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  getAddProduct: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/addClothProduct`);
      console.log(data);
      set({
        loading: false,
        product: [],
        pageAll: null,
        addData: data,
        productData: {},
        query: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  getAddExampleProduct: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/addExampleProduct`);
      console.log(data);
      set({
        loading: false,
        product: [],
        pageAll: null,
        addData: data,
        query: null,
        productData: {},
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  getAddKhwantaProduct: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/product/addOtherProduct`);
      console.log(data);
      set({
        loading: false,
        product: [],
        pageAll: null,
        addData: data,
        query: null,
        productData: {},
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response.data.message,
      });
    }
  },
  addProduct: async (product) => {
    const state = get();
    set({ loading: true });
    const upload = uploadproductimage(
      "Product",
      state.productData.FrontImage,
      state.productData.BackImage,
      state.productData.DetailImage,
      `${state.productData.code}${state.productData.fabric}`
    );
    upload.then(async (result) => {
      try {
        const { data } = await axios.post(`${url}/product/addClothProduct`, {
          data: state.productData,
          image: result,
        });
        set((state) => ({
          ...state,
          loading: false,
          res: data,
        }));
      } catch (error) {
        console.log(error);
        const allimg = [...result[0], result[1], result[2]];
        Promise.all(allimg.map((img) => deleteObject(ref(storage, img))))
          .then((res) => {
            console.log("res", res);
            notify(error.response.data.message);
            set((state) => ({
              ...state,
              loading: false,
            }));
          })
          .catch((err) => notify(err));
      }
    });
  },
  addKhwantaProduct: async (product) => {
    const state = get();
    set({ loading: true });
    const upload = uploadproductimage(
      "Product",
      state.productData.FrontImage,
      state.productData.BackImage,
      state.productData.DetailImage,
      `${state.productData.name}${Date.now()}}`
    );
    upload.then(async (result) => {
      try {
        const { data } = await axios.post(`${url}/product/addOtherProduct`, {
          data: state.productData,
          image: result,
        });
        set((state) => ({
          ...state,
          loading: false,
          res: data,
        }));
      } catch (error) {
        console.log(error);
        const allimg = [...result[0], result[1], result[2]];
        Promise.all(allimg.map((img) => deleteObject(ref(storage, img))))
          .then((res) => {
            console.log("res", res);
            notify(error.response.data.message);
            set((state) => ({
              ...state,
              loading: false,
            }));
          })
          .catch((err) => notify(err));
      }
    });
  },
  addExampleProduct: async (product) => {
    const state = get();
    set({ loading: true });
    const upload = uploadproductimage(
      "Product",
      state.productData.FrontImage,
      state.productData.BackImage,
      state.productData.DetailImage,
      `${state.productData.name}${Date.now()}}`
    );
    upload.then(async (result) => {
      try {
        const { data } = await axios.post(`${url}/product/addExampleProduct`, {
          data: state.productData,
          image: result,
        });
        set((state) => ({
          ...state,
          loading: false,
          res: data,
        }));
      } catch (error) {
        console.log(error);
        const allimg = [...result[0], result[1], result[2]];
        Promise.all(allimg.map((img) => deleteObject(ref(storage, img))))
          .then((res) => {
            console.log("res", res);
            notify(error.response.data.message);
            set((state) => ({
              ...state,
              loading: false,
            }));
          })
          .catch((err) => notify(err));
      }
    });
  },
  deleteProduct: async (id) => {},
  updatePrice: async (id, price) => {},
  addDetailImage: async (id, image) => {},
  deleteDetailImage: async (id, image) => {},
}));

export default useProductStore;
