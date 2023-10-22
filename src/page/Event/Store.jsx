import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import useShopState from "../../zustand/shopState";
import ShopCard from "../../components/Shop/ShopCard";

const Store = () => {
  const navigate = useNavigate();
  const getShop = useShopState((state) => state.getShop);
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useShopState((state) => state.loading);
  const Shop = useShopState((state) => state.Shop);

  useEffect(() => {
    getShop();
  }, []);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  return (
    <div className="maindiv">
      <h1 className="mb-5 text-3xl text-primary">Store</h1>
      <div className="grid grid-cols-4 gap-4">
        {Shop.map((item) => {
          if (item.type === "store")
            return <ShopCard key={item._id} item={item} />;
        })}
      </div>
      <div className="flex justify-between mt-12 mb-5 ">
        <h1 className="text-3xl text-primary">Event</h1>
        <div className="flex items-center justify-end w-full ">
          <button
            id="submit"
            className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
            onClick={() => navigate("/shop/addEvent")}
          >
            สร้าง Event
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Shop.map((item) => {
          if (item.type === "event")
            return <ShopCard key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Store;
