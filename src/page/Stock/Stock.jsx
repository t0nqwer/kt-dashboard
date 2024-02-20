import React, { useEffect, useState } from "react";
import useStockStore from "../../zustand/stockState";
import { useAppState } from "../../zustand/appState";

const Stock = () => {
  const [fetchBy, setFetchBy] = useState("shop"); // ['shop', 'product'
  const setLoad = useAppState((state) => state.setLoad);
  const { loading, stock, fetchStockByshop, fetchStockByProduct } =
    useStockStore();
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  return (
    <div className="maindiv">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-primary">สต๊อคสินค้า</h1>
      </div>
      <div className="flex justify-center space-x-5">
        <button
          className={`px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray ${
            fetchBy === "shop" ? "bg-primary" : "bg-secondary-gray"
          }`}
          onClick={() => {
            setFetchBy("shop");
            fetchStockByshop();
          }}
        >
          ดูสต๊อคตามร้านค้า
        </button>
        <button
          className={`px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray ${
            fetchBy === "product" ? "bg-primary" : "bg-secondary-gray"
          }`}
          onClick={() => {
            setFetchBy("product");
            fetchStockByProduct();
          }}
        >
          ดูสต๊อคตามสินค้า
        </button>
      </div>
    </div>
  );
};

const StockByProduct = ({ product }) => {
  return (
    <li
      key={product._id}
      className="grid grid-cols-7 px-5 py-3 mt-1 text-center rounded-md bg-primary bg-opacity-10"
    >
      <div className="col-span-2">{product.productName}</div>
      <div className="col-span-1">{product.productCode}</div>
      <div className="col-span-1">{product.productType}</div>
      <div className="col-span-1">{product.weight}</div>
      <div className="col-span-1">{product.price}</div>
      <div className="col-span-1">{product.stock}</div>
    </li>
  );
};

export default Stock;
