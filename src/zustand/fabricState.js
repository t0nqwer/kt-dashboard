import { create } from "zustand";
import { notify, notifySuccess } from "../function/notification";
import axios from "axios";
import { url } from "../assets/public";

const useFabricStore = create((set, get) => ({
  fabric: [],
  addData: {},
  loading: false,
  info: {},
  res: {},

  fetchFabric: async (page, search) => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/fabric`);

      set((state) => ({
        ...state,
        fabric: data,
        loading: false,
      }));
    } catch (error) {
      notify(error.response.data.error);
      set((state) => ({ ...state, loading: false }));
    }
  },
  getAddFabric: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${url}/fabric/getAddFabric`);

      set((state) => ({
        ...state,
        loading: false,
        addData: data,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
    }
  },
  addFabric: async () => {
    const state = get();
    console.log(state.info);

    if (state.info.pattern || state.info.pattern !== null) {
      const check = state.addData.fabric.find(
        (e) =>
          e.type === state.info.type &&
          e.color === state.info.color &&
          e.weaving === state.info.weaving &&
          e.pattern === state.info.pattern
      );
      if (check) return notify("Fabric already exist");
    } else {
      const check = state.addData.fabric.find(
        (e) =>
          e.type === state.info.type &&
          e.color === state.info.color &&
          e.weaving === state.info.weaving
      );
      if (check) return notify("Fabric already exist");
    }

    set({ loading: true });
    try {
      const { data } = await axios.post(`${url}/fabric`, state.info);
      notifySuccess("Fabric add successfully");
      set((state) => ({
        ...state,
        loading: false,
        res: data,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
      notify(error.response.data.message);
    }
  },
  addWeaving: async (info) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(`${url}/fabric/weaving`, {
        name: info,
      });
      notifySuccess("Weaving add successfully");
      set((state) => ({
        ...state,
        loading: false,
        addData: data,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
      notify("Weaving already exist");
    }
  },
  addPattern: async (info) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(`${url}/fabric/pattern`, {
        name: info,
      });
      notifySuccess("Pattern add successfully");
      set((state) => ({
        ...state,
        loading: false,
        addData: data,
      }));
    } catch (error) {
      set((state) => ({
        ...state,
        loading: false,
        error: error.response.data.message,
      }));
      notify("Pattern already exist");
    }
  },
}));

export default useFabricStore;
