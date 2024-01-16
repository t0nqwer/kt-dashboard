import React from "react";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const createOrder = () => {
    navigate("/sale/order/create");
  };
  const queryOrder = (e) => {
    navigate(`/sale/order?order_filter=${e.target.innerHTML}`);
  };
  return (
    <div className="maindiv">
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">Order</h1>
        <button
          id="createOrder"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={createOrder}
        >
          สร้างออเดอร์
        </button>
      </div>
      <ul className="flex justify-center w-full mt-10 space-x-10 text-center select-none">
        <li
          className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white"
          onClick={queryOrder}
        >
          ทั้งหมด
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          สำเร็จแล้ว
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          พร้อมส่ง-ยังไม่จ่าย
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          ส่งแล้ว-ยังไม่จ่าย
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          ยังไม่เสร็จ
        </li>
        <li className="px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white">
          ยกเลิก
        </li>
      </ul>
      <div className="mt-5">
        <div className="flex justify-between w-full px-2 text-center bg-opacity-50 rounded-md ">
          <div className="w-1/6 text-primary">Order ID</div>
          <div className="w-1/6 text-primary">Customer</div>
          <div className="w-1/6 text-primary">store</div>

          <div className="w-1/6 text-primary">Order Create Date</div>
          <div className="w-1/6 text-primary">Order Due Date</div>
          <div className="w-1/6 text-primary">Order Status</div>
        </div>
        <div className="flex justify-between w-full px-2 py-3 mt-2 text-lg text-center bg-opacity-50 rounded-md bg-primary ">
          <div className="w-1/6 text-secondary-light">O2131231</div>
          <div className="w-1/6 text-secondary-light">JIRAPAT TEJA</div>
          <div className="w-1/6 text-secondary-light">OTOP AUG 2023</div>
          <div className="w-1/6 text-secondary-light">21-11-2540</div>
          <div className="w-1/6 text-secondary-light">21-11-2540</div>
          <div className="w-1/6 text-secondary-light">Success</div>
        </div>
      </div>
    </div>
  );
};

export default Order;
