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
import { notify, notifySuccess } from "../function/notification";

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
  DetailImage: "",
  setProduct: (data) => set((state) => ({ ...state, product: data })),
  fetchProduct: async (page, search) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(
        `${url}/product/other?page=${page}&search=${search}`
      );

      set({
        loading: false,
        product: data.products,
        pageAll: data.pagecount,
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
        product: data.products,
        pageAll: data.pagecount,
        singledata: null,
        query: data?.query,
      });
    } catch (error) {
      notify(error.response.data.error);
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
        product: data.products,
        pageAll: data.pagecount,
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
      const { data } = await axios.get(`${url}/product/other/${id}`);
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
  getAddProduct: async () => {
    set({ loading: true, productData: {} });
    try {
      const { data } = await axios.get(`${url}/product/addClothProduct`);

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
  updatePrice: async (price) => {
    const state = get();
    set({ loading: true });
    try {
      const { data } = await axios.put(`${url}/product/updatePrice`, {
        id: state.singledata._id,
        price,
      });
      if (data.message === "success") {
        set({ loading: false, singledata: { ...state.singledata, price } });
      }
    } catch (error) {
      set({ loading: false, error: error.response.data.message });
    }
  },
  setDetailImage: (image) => {
    set((state) => ({ ...state, DetailImage: image }));
  },
  addDetailImage: async (image, id) => {
    const statedata = get();
    console.log(id);
    set((state) => ({ ...state, loading: true, error: null }));
    const file = image;
    const fileRef = ref(storage, `Product/${id}/DetailImage/${new Date()}`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    getDownloadURL(uploadTaskSnapshot.ref)
      .then(async (downloadURL) => {
        try {
          const { data } = await axios.post(`${url}/product/detailimage`, {
            id: id,
            img: downloadURL,
          });
          console.log([...statedata.singledata.DetailImage, downloadURL]);
          set((state) => ({
            ...state,
            loading: false,
            singledata: {
              ...statedata.singledata,
              DetailImage: [...statedata.singledata.DetailImage, downloadURL],
            },
          }));
        } catch (error) {
          console.log(error);
          deleteObject(ref(storage, downloadURL)).then(() => {
            set((state) => ({
              ...state,
              error: error.response.data.message,
              loading: false,
            }));
          });
        }
      })
      .catch((err) => console.log(err));
  },
  deleteDetailImage: async (id, image) => {
    const state = get();
    set({ loading: true });
    try {
      const { data } = await axios.put(`${url}/product/detailimage`, {
        id: state.singledata?._id,
        img: state.DetailImage,
      });
      notifySuccess("ลบรูปภาพสำเร็จ");
      set((state) => ({
        ...state,
        loading: false,
        singledata: {
          ...state.singledata,
          DetailImage: state.singledata.DetailImage.filter(
            (img) => img !== state.DetailImage
          ),
        },
        detailImage: "",
      }));
    } catch (error) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
    }
  },
  deleteProduct: async (id) => {
    const state = get();
    set({ loading: true });
    try {
      const { data } = await axios.delete(`${url}/product/${id}`);
      notifySuccess("ลบสินค้าสำเร็จ");
      set((state) => ({
        ...state,
        loading: false,
        singledata: null,
        res: "delete success",
      }));
    } catch (error) {
      console.log(error);
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
    }
  },
  reset: () => {
    set({
      loading: false,
      singledata: null,
      pageAll: 0,
      product: [],
      error: null,
      query: [],
      addData: null,
      productData: {},
      res: {},
      DetailImage: "",
    });
  },
}));

export default useProductStore;
