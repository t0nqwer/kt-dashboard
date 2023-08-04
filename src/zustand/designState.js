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
const useDesignStore = create((set) => ({
  design: [],
  pageAll: 0,
  singledata: null,
  loading: false,
  error: null,
  adddata: null,
  designData: {},
  fetchDesign: async (page, search) => {
    set({ loading: true });
    const response = await axios.get(
      `${url}/design/getDesignList?page=${page}&search=${search}`
    );
    if (response.status === 200) {
      set((state) => ({
        ...state,
        design: response.data.data,
        pageAll: response.data.page.numberPage,
        loading: false,
        singledata: null,
      }));
    }
  },
  getAddDesign: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/design/addDesign`);
      console.log(data);
      set((state) => ({
        ...state,
        loading: false,
        adddata: data,
        query: data.query,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
    }
  },
  deleteDesign: async () => {
    set({ loading: true });
    const response = await axios.get(`${url}/design/deleteDesign/:id`);
  },
  updateDesign: async () => {
    set({ loading: true });
    const response = await axios.get(`${url}/design/updateDesign`);
  },
  createDesign: async () => {
    set({ loading: true });
    const response = await axios.get(`${url}/design/createDesign`);
  },
  addDetailImage: async (image, id) => {
    set((state) => ({ ...state, loading: true, error: null }));
    const file = image;
    const fileRef = ref(storage, `Design/detail/${id}-${new Date().getTime()}`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    getDownloadURL(uploadTaskSnapshot.ref).then(async (downloadURL) => {
      try {
        const response = await axios.get(`${url}/design/addDetailImage`, {
          id: id,
          img: downloadURL,
        });
        set((state) => ({
          ...state,
          design: response.data.data,
          pageAll: response.data.page.numberPage,
          loading: false,
          singledata: null,
        }));
      } catch (error) {
        deleteObject(ref(storage, downloadURL)).then(() => {
          set((state) => ({
            ...state,
            error: error.response.data.message,
            loading: false,
          }));
        });
      }
    });
  },
  deleteDetailImage: async () => {
    set({ loading: true });
    const response = await axios.get(`${url}/design/deleteDetailImage`);
  },
  fetchSingleDesign: async (code) => {
    set({ loading: true });
    const response = await axios.get(`${url}/design/singleDesign/${code}`);
    if (response.status === 200) {
      set((state) => ({
        ...state,
        singledata: response.data.data,
        loading: false,
      }));
    }
  },
}));

export default useDesignStore;
