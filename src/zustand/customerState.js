import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";
import { notify } from "../function/notification";

const useCustomerStore = create((set) => ({
  loading: false,
  customer: null,
  customers: [],
  res: "",
  fetchCustomers: async () => {
    try {
      const response = await axios.get(`${url}/customer`);
      if (response.status === 200) {
        console.log(response.data);
        set((state) => ({
          ...state,
          customers: response.data,
        }));
      }
    } catch (error) {
      console.log(error);
      notify(error);
    }
  },
  createCustomer: async (data) => {
    console.log(data);
    // try {
    //   const response = await axios.post(`${url}/customer`, data);
    //   if (response.status === 201) {
    //     notify("เพิ่มข้อมูลสำเร็จ");
    //     set((state) => ({
    //       ...state,
    //       res: "success",
    //       loading: false,
    //     }));
    //   }
    // } catch (error) {
    //   notify(error);
    //   set((state) => ({
    //     ...state,
    //     res: "error",
    //     loading: false,
    //   }));
    // }
  },
  fetchCustomerById: async (id) => {
    try {
      const response = await axios.get(`${url}/customer/${id}`);
      if (response.status === 200) {
        console.log(response.data);
        set((state) => ({
          ...state,
          customer: response.data,
        }));
      }
    } catch (error) {
      console.log(error);
      notify(error);
    }
  },
}));

export default useCustomerStore;
