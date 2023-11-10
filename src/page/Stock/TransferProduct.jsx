import React from "react";
import { useNavigate } from "react-router-dom";

const TransferList = () => {
  return (
    <li className="grid grid-cols-12 px-5 py-3 text-center rounded-md bg-primary bg-opacity-10 ">
      <div className="flex items-center justify-start col-span-2">
        <div className={`w-3 h-3 mr-2 bg-green-500 rounded-full`}></div>
        TransferID
      </div>
      <div className="col-span-2">from</div>
      <div className="col-span-2">to</div>
      <div className="col-span-1">date</div>
      <div className="col-span-1">date</div>
      <div className="col-span-1">status</div>
    </li>
  );
};

const TransferProduct = () => {
  const navigate = useNavigate();
  return (
    <div className="maindiv">
      <div className="flex">
        <h1 className="text-3xl text-primary">รายการส่งสินค้า</h1>
        <button
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={() => navigate("/stock/transfer/create")}
        >
          สร้างรายการส่งสินค้า
        </button>
      </div>
      <ul>
        <TransferList />
      </ul>
    </div>
  );
};

export default TransferProduct;
