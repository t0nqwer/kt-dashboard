import React from "react";
import { useNavigate } from "react-router-dom";

const Bill = () => {
  const navigate = useNavigate();
  const createBill = () => {
    navigate("/sale/bill/create");
  };
  return (
    <div className=" maindiv">
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">Bill</h1>
        <button
          id="createBill"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={createBill}
        >
          สร้างบิลใหม่
        </button>
      </div>
      <ul className="flex justify-center w-full mt-10 space-x-10 text-center select-none">
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          ทั้งหมด
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          บิลร้านค้า
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          บิลร้านค้า
        </li>
      </ul>
    </div>
  );
};

export default Bill;
