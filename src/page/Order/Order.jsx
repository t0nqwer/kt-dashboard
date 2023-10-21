import React from "react";

const Order = () => {
  return (
    <div className="maindiv">
      <h1 className="text-3xl text-primary">Order</h1>
      <div className="mt-5">
        <div className="flex justify-between w-full px-2 text-center bg-opacity-50 rounded-md ">
          <div className="w-1/6 text-primary">Order ID</div>
          <div className="w-1/6 text-primary">Customer</div>
          <div className="w-1/6 text-primary">store</div>

          <div className="w-1/6 text-primary">Order Create Date</div>
          <div className="w-1/6 text-primary">Order Due Date</div>
          <div className="w-1/6 text-primary">Order Status</div>
        </div>
        <div className="flex justify-between w-full px-2 py-5 mt-2 text-lg text-center bg-opacity-50 rounded-md bg-primary ">
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
