import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";

const useEmployeeContext = create((set) => ({
  loading: false,
  employeeList: [],
  res: "",
  setRes: (res) => set((state) => ({ ...state, res })),
  fetchEmployeeList: async () => {},
  getAddEmployee: async () => {},
  updateEmployee: async () => {},
  addEmployee: async (data) => {
    set((state) => ({ ...state, loading: true }));

    const response = await axios.post(`${url}/user/create`, data);
    if (response.status === 200) {
      set((state) => ({ ...state, res: response.data, loading: false }));
    } else {
      set((state) => ({ ...state, res: response.data, loading: false }));
    }
  },
  deleteEmployee: async () => {},
}));

export default useEmployeeContext;
