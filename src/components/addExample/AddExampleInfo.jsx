import React from "react";
import useProductStore from "../../zustand/productState";
import Select from "../Select";
const AddExampleInfo = ({ data }) => {
  const nameInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, name: e.target.value },
    }));
  };
  const descriptionInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, description: e.target.value },
    }));
  };
  const categoryInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, category: e },
    }));
  };
  const priceInput = (e) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: { ...state.productData, price: e.target.value },
    }));
  };
  return (
    <div className="flex flex-wrap w-full">
      <div className={`divclass`}>
        <p className={`lableClassName`}>ชื่อ : </p>
        <input
          className={`text-center  input `}
          type="text"
          name="name"
          onChange={nameInput}
        />
      </div>
      <div className={`divclass`}>
        <p className={`lableClassName`}> รายละเอียด : </p>
        <textarea
          className={`text-center  input `}
          type="text"
          name="description"
          onChange={descriptionInput}
        />
      </div>
      <div className={`divclass`}>
        <p className={`lableClassName`}> ประเภท : </p>
        <Select Data={data?.categories} chooseMessage={categoryInput} />
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

export default AddExampleInfo;
