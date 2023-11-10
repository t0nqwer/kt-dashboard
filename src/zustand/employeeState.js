import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";
import { notify, notifySuccess } from "../function/notification";

const useEmployeeContext = create((set) => ({
  loading: false,
  employeeList: [],
  res: "",
  setRes: (res) => set((state) => ({ ...state, res })),
  getAddEmployee: async () => {},
  updateEmployee: async () => {},
  addEmployee: async (data) => {
    set((state) => ({ ...state, loading: true }));

    try {
      const response = await axios.post(`${url}/user/register`, data);
      notifySuccess("Employee Added Successfully");
      set((state) => ({
        ...state,
        employeeList: response.data,
        loading: false,
        res: "Successfully created",
      }));
    } catch (error) {
      console.log(error.response.data.message);
      notify(error.response.data.message);
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
  fetchEmployeeList: async () => {
    set((state) => ({ ...state, loading: true }));
    try {
      const { data } = await axios.get(`${url}/user/all`);
      set((state) => ({
        ...state,
        loading: false,
        employeeList: data,
      }));
    } catch (error) {
      console.log(error.response.data.error);
      notify(error.response.data.error);
      set((state) => ({
        ...state,
        loading: false,
      }));
    }
  },
  deleteEmployee: async () => {},
}));

export default useEmployeeContext;
