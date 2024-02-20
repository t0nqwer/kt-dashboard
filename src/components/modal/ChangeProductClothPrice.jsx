import React, { useState } from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import useProductStore from "../../zustand/productState";
import useModalControlState from "../../zustand/modalControlState";
const ChangeProductClothPrice = () => {
  const [Price, setPrice] = useState(0);
  const ChangeProductClothPrice = useModalControlState(
    (state) => state.ChangeProductClothPrice
  );
  const setChangeProductClothPrice = useModalControlState(
    (state) => state.setChangeProductClothPrice
  );
  const updatePrice = useProductStore((state) => state.updatePrice);

  return (
    <div className="absolute flex animate-fadein justify-center items-center top-0 left-0 w-screen h-screen p-10 rounded-md bg-primary backdrop-blur-lg bg-opacity-50 max-md:p-0 z-[8888]">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-secondary-cream">
        <p className="text-3xl ">เปลี่ยนราคาสินค้า</p>
        <div className="h-12 mt-5 text-center ">
          <input
            type="number"
            className="input"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="px-5 py-2 mt-5 mr-5 text-lg font-semibold text-white transition-all bg-red-900 rounded-md hover:bg-red-500 hover:scale-125 active:bg-red-800 active:scale-110"
            onClick={() => {
              setPrice(0);
              setChangeProductClothPrice(false);
            }}
          >
            <MdOutlineClose />
          </button>
          <button
            className="px-5 py-2 mt-5 text-lg font-semibold text-white transition-all bg-green-900 rounded-md hover:bg-green-500 hover:scale-125 active:bg-green-800 active:scale-110"
            onClick={() => {
              setChangeProductClothPrice(false);
              updatePrice(Price);
              setPrice(0);
              //   deleteDetailImage();
            }}
          >
            <MdOutlineCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeProductClothPrice;
