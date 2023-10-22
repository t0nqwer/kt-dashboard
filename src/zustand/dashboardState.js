import { create } from "zustand";
import axios from "axios";
import { url } from "../assets/public";

const useDashboardState = create((set) => ({
  firstSection: {},
  secondSection: {},
  thirdSection: {},
  fourthSection: {},

  fetchFirstSection: async () => {
    try {
      const response = await axios.get(`${url}/dashboard/firstSection`);
      if (response.status === 200) {
        console.log(response.data);
        set((state) => ({
          ...state,
          firstSection: response.data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDashboardState;
