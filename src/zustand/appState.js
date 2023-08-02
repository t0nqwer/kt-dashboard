import { create } from "zustand";

export const useAppState = create((set) => ({
  activeSidebar: true,
  pathname: window.location.pathname,
  isLoad: false,
  activeNavbar: "",
  setNavbar: (value) => set((state) => ({ ...state, activeNavbar: value })),
  setLoad: (value) => set((state) => ({ ...state, isLoad: value })),
  toggleSidebar: () =>
    set((state) => ({ ...state, activeSidebar: !state.activeSidebar })),
  setPathname: (pathname) => set((state) => ({ ...state, pathname })),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
}));
