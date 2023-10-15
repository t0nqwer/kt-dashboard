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
import { uploadimage } from "../function/uploadimage";
import { notify, notifySuccess } from "../function/notification";
const useDesignStore = create((set, get) => ({
  design: [],
  pageAll: 0,
  singledata: null,
  loading: false,
  error: null,
  res: "",
  adddata: null,
  designData: {},
  fetchDesign: async (page, search) => {
    set({ loading: true });

    try {
      const response = await axios.get(
        `${url}/design/design?page=${page}&search=${search}`
      );
      if (response.status === 200) {
        console.log(response.data.data);
        set((state) => ({
          ...state,
          design: response.data.data,
          pageAll: response.data.page,
          loading: false,
          singledata: null,
        }));
      }
    } catch (error) {
      set((state) => ({ ...state, loading: false }));
    }
  },
  getAddDesign: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/design/addDesign`);
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
  updateDesign: async (code) => {
    set({ loading: true });
    try {
      const response = await axios.put(`${url}/design/${code}`, {
        data: get().designData,
      });
      console.log(response);
      notifySuccess(response.data.message);
      set((state) => ({
        ...state,
        loading: false,
        res: response.data.message,
      }));
    } catch (error) {
      notify(error.response.data.message);
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
    }
  },
  createDesign: async () => {
    const state = get();
    set({ loading: true });
    const upload = uploadimage(
      "Design",
      state.designData.FrontImage,
      state.designData.BackImage,
      state.designData.DetailImage,
      state.designData.code
    );
    upload.then(async (result) => {
      try {
        console.log(result);
        const { data } = await axios.post(`${url}/design/addDesign`, {
          data: state.designData,
          image: result,
        });
        set((state) => ({
          ...state,
          loading: false,
          res: data.message,
        }));
      } catch (error) {
        const allimg = [...result[0], result[1], result[2]];
        Promise.all(allimg.map((img) => deleteObject(ref(storage, img))))
          .then((res) => {
            console.log("res", res);
            notify(error.response.data.error);
            set((state) => ({
              ...state,
              loading: false,
            }));
          })
          .catch((err) => notify(err));
      }
    });
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
    const response = await axios.get(`${url}/design/${code}`);
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
