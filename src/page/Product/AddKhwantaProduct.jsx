import React, { useEffect, useState, useRef } from "react";
import { useAppState } from "../../zustand/appState";
import useProductStore from "../../zustand/productState";
import AddKhwantaInfo from "../../components/addKhwanta/AddKhwantaInfo";
import AddKhwantaImage from "../../components/addKhwanta/AddKhwantaImage";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../function/notification";
const AddKhwantaProduct = () => {
  const navigate = useNavigate();

  const [errorCheck, setErrorCheck] = useState({
    name: false,
    supplier: false,
    category: false,
    price: false,
    front: false,
    back: false,
  });
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useProductStore((state) => state.loading);
  const addData = useProductStore((state) => state.addData);
  const getAddKhwantaProduct = useProductStore(
    (state) => state.getAddKhwantaProduct
  );
  const productData = useProductStore((state) => state.productData);
  const addKhwantaProduct = useProductStore((state) => state.addKhwantaProduct);
  const res = useProductStore((state) => state.res);

  useEffect(() => {
    console.log(errorCheck);
    const checkSupplier = addData?.suppliers?.filter(
      (e) => e === productData.supplier
    );
    const checkCategory = addData?.categories?.filter(
      (e) => e === productData.category
    );
    if (checkSupplier?.length === 1) {
      setErrorCheck((state) => ({ ...state, supplier: true }));
    } else {
      setErrorCheck((state) => ({ ...state, supplier: false }));
    }
    if (checkCategory?.length === 1) {
      setErrorCheck((state) => ({ ...state, category: true }));
    } else {
      setErrorCheck((state) => ({ ...state, category: false }));
    }
    if (productData?.name) {
      setErrorCheck((state) => ({ ...state, name: true }));
    } else {
      setErrorCheck((state) => ({ ...state, name: false }));
    }
    if (productData?.price) {
      setErrorCheck((state) => ({ ...state, price: true }));
    } else {
      setErrorCheck((state) => ({ ...state, price: false }));
    }
    if (productData?.FrontImage) {
      setErrorCheck((state) => ({ ...state, front: true }));
    } else {
      setErrorCheck((state) => ({ ...state, front: false }));
    }
    if (productData?.BackImage) {
      setErrorCheck((state) => ({ ...state, back: true }));
    } else {
      setErrorCheck((state) => ({ ...state, back: false }));
    }
  }, [productData]);
  useEffect(() => {
    const element = document.getElementById("submit");
    if (
      errorCheck.name &&
      errorCheck.supplier &&
      errorCheck.category &&
      errorCheck.price &&
      errorCheck.front &&
      errorCheck.back
    ) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }, [errorCheck]);

  useEffect(() => {
    getAddKhwantaProduct();
  }, []);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    console.log(res);
    if (res.message === "success") {
      notifySuccess("เพิ่มแบบสินค้าเรียบร้อย");
      navigate(`/product/khwanta/${res.id}`);
    }
  }, [res]);
  const disablebutton = (e) => {
    const element = document.getElementById("submit");
    if (e) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  };
  const submitdata = (e) => {
    addKhwantaProduct();
  };
  return (
    <div className="px-10 pb-20 ">
      <h1 className="text-3xl text-primary ">เพิ่มสินค้า Khwanta</h1>
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
