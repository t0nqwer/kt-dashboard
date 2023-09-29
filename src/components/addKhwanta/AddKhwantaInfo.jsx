import React, { useState, useEffect } from "react";
import useProductStore from "../../zustand/productState";
import Select from "../Select";

const AddKhwantaInfo = ({ data }) => {
  const [codeError, setCodeError] = useState(false);

  const nameInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, name: e.target.value },
    }));
  };
  const supplierInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, supplier: e },
    }));
  };
  const priceInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, price: e.target.value },
    }));
  };
  const categoryInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, category: e },
    }));
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className={`divclass`}>
        <p className={`lableClassName`}>ชื่อ : </p>
        <input
          className={`text-center ${codeError ? "bg-red-200" : ""} input `}
          type="text"
          name="code"
          onChange={nameInput}
        />
        {codeError && (
          <p className="absolute text-xs text-red-500 right-2">
            สินค้ามีในระบบแล้ว
          </p>
        )}
      </div>
      <div className={`divclass`}>
        <p className={`lableClassName`}> ซัพพลายเออร์ : </p>
        <Select Data={data.suppliers} chooseMessage={supplierInput} />
      </div>
      <div className={`divclass`}>
        <p className={`lableClassName`}> ประเภท : </p>
        <Select Data={data.categories} chooseMessage={categoryInput} />
      </div>
      <div className={`divclass`}>
        <p className={`lableClassName`}> ราคา : </p>
        <input
          className="text-center input"
          type="number"
          name="price"
          onChange={priceInput}
        />
      </div>
    </div>
  );
};

export default AddKhwantaInfo;
