import React, { useEffect, useState, useRef } from "react";
import { useAppState } from "../../zustand/appState";
import useProductStore from "../../zustand/productState";
import AddKhwantaInfo from "../../components/addKhwanta/AddKhwantaInfo";
import AddKhwantaImage from "../../components/addKhwanta/AddKhwantaImage";
const AddKhwantaProduct = () => {
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useProductStore((state) => state.loading);
  const addData = useProductStore((state) => state.addData);
  const getAddProduct = useProductStore((state) => state.getAddProduct);
  useEffect(() => {
    getAddProduct();
  }, []);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  const disablebutton = (e) => {
    const element = document.getElementById("submit");
    if (e) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  };
  const submitdata = (e) => {};
  return (
    <div className="px-10 pb-20 ">
      <h1 className="text-3xl text-primary ">เพิ่มแบบเสื้อผ้า</h1>
      {addData && (
        <>
          <AddKhwantaInfo data={addData} disable={disablebutton} />
          <AddKhwantaImage />
        </>
      )}
      <div className="flex items-center justify-end w-full ">
        <button
          id="submit"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={submitdata}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default AddKhwantaProduct;
