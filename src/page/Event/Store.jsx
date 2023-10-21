import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Store = () => {
  const navigate = useNavigate();

  return (
    <div className="maindiv">
      <h1 className="mb-5 text-3xl text-primary">Store</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full rounded-md h-52 bg-secondary-gray">
          <div className="relative w-full h-40 overflow-hidden rounded bg-secondary-cream">
            <img className="absolute object-contain w-full h-full " alt="" />
          </div>
          <div className="w-full text-lg text-center text-secondary-light">
            <h2> ปตท. เมืองนาง</h2>
          </div>
        </div>
      </div>
      <h1 className="mt-10 text-3xl text-primary">Event</h1>
      <div className="flex items-center justify-end w-full mb-5 ">
        <button
          id="submit"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={() => navigate("/shop/addEvent")}
        >
          สร้าง Event
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full rounded-md h-52 bg-secondary-gray">
          <div className="relative w-full h-40 overflow-hidden rounded bg-secondary-cream">
            <img className="absolute object-contain w-full h-full " alt="" />
          </div>
          <div className="w-full text-lg text-center text-secondary-light">
            <h2> ปตท. เมืองนาง</h2>
          </div>
        </div>
        <div className="w-full rounded-md h-52 bg-secondary-gray">
          <div className="relative w-full h-40 overflow-hidden rounded bg-secondary-cream">
            <img className="absolute object-contain w-full h-full " alt="" />
          </div>
          <div className="w-full text-lg text-center text-secondary-light">
            <h2> ปตท. เมืองนาง</h2>
          </div>
        </div>
        <div className="w-full rounded-md h-52 bg-secondary-gray">
          <div className="relative w-full h-40 overflow-hidden rounded bg-secondary-cream">
            <img className="absolute object-contain w-full h-full " alt="" />
          </div>
          <div className="w-full text-lg text-center text-secondary-light">
            <h2> ปตท. เมืองนาง</h2>
          </div>
        </div>
        <div className="w-full rounded-md h-52 bg-secondary-gray">
          <div className="relative w-full h-40 overflow-hidden rounded bg-secondary-cream">
            <img className="absolute object-contain w-full h-full " alt="" />
          </div>
          <div className="w-full text-lg text-center text-secondary-light">
            <h2> ปตท. เมืองนาง</h2>
          </div>
        </div>
        <div className="w-full rounded-md h-52 bg-secondary-gray">
          <div className="relative w-full h-40 overflow-hidden rounded bg-secondary-cream">
            <img className="absolute object-contain w-full h-full " alt="" />
          </div>
          <div className="w-full text-lg text-center text-secondary-light">
            <h2> ปตท. เมืองนาง</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
