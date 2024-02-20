import { create } from "zustand";

const useModalControlState = create((set) => ({
  deleteDesignDetailImage: false,
  ChangeProductClothPriceModal: false,
  DeleteProductDetailImageModal: false,
  FabricPatternModal: false,
  FabricWeavingModal: false,
  confirmTransferModal: false,
  setConfirmTransferModal: (value) =>
    set((state) => ({ ...state, confirmTransferModal: value })),
  setFabricPatternModal: (value) =>
    set((state) => ({ ...state, FabricPatternModal: value })),
  setFabricWeavingModal: (value) =>
    set((state) => ({ ...state, FabricWeavingModal: value })),
  setDeleteProductDetailImage: (value) =>
    set((state) => ({ ...state, DeleteProductDetailImageModal: value })),
  setChangeProductClothPrice: (value) =>
    set((state) => ({ ...state, ChangeProductClothPriceModal: value })),
  setDeleteDesignDetailImage: (value) =>
    set((state) => ({ ...state, deleteDesignDetailImage: value })),
}));

export default useModalControlState;
