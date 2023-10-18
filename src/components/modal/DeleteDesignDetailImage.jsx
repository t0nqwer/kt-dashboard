import React from "react";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";

const DeleteDesignDetailImage = () => {
  return (
    <div className="absolute flex justify-center items-center top-0 left-0 w-screen h-screen p-10 rounded-md bg-primary backdrop-blur-lg bg-opacity-50 max-md:p-0 z-[10000]">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-secondary-cream">
        <p className="text-3xl ">ต้องการลบรูปนี้หรือไม่</p>
        <div className="flex items-center justify-center ">
          <button className="px-5 py-2 mt-5 mr-5 text-lg font-semibold text-white transition-all bg-red-900 rounded-md hover:bg-red-500 hover:scale-125 active:bg-red-800 active:scale-110">
            <MdOutlineClose />
          </button>
          <button className="px-5 py-2 mt-5 text-lg font-semibold text-white transition-all bg-green-900 rounded-md hover:bg-green-500 hover:scale-125 active:bg-green-800 active:scale-110">
            <MdOutlineCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDesignDetailImage;
