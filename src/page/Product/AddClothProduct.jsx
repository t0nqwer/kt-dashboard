import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddClothInfo from "../../components/addCloth/AddClothInfo";
import AddClothImage from "../../components/addCloth/AddClothImage";
import { useAppState } from "../../zustand/appState";
import useProductStore from "../../zustand/productState";
import { notifySuccess } from "../../function/notification";

const AddClothProduct = () => {
  const navigate = useNavigate();

  const [errorCheck, setErrorCheck] = useState({
    code: false,
    fabric: false,
    price: false,
    front: false,
    back: false,
  });
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useProductStore((state) => state.loading);
  const addData = useProductStore((state) => state.addData);
  const getAddProduct = useProductStore((state) => state.getAddProduct);
  const productData = useProductStore((state) => state.productData);
  const addProduct = useProductStore((state) => state.addProduct);
  const res = useProductStore((state) => state.res);
  useEffect(() => {
    getAddProduct();
  }, []);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    const checkcode = addData?.design?.filter(
      (e) => e.code === productData.code
    );
    const checkfabric = addData?.fabric?.filter(
      (e) => e.name === productData.fabric
    );
    const checkProduct = addData?.product?.filter(
      (e) => e.design === checkcode[0]?._id && e.fabric === checkfabric[0]?._id
    );
    if (checkcode?.length === 1) {
      setErrorCheck((state) => ({ ...state, code: true }));
    } else {
      setErrorCheck((state) => ({ ...state, code: false }));
    }
    if (checkfabric?.length === 1) {
      setErrorCheck((state) => ({ ...state, fabric: true }));
    } else {
      setErrorCheck((state) => ({ ...state, fabric: false }));
    }
    if (checkProduct?.length >= 1) {
      setErrorCheck((state) => ({ ...state, code: false }));
      setErrorCheck((state) => ({ ...state, fabric: false }));
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
    console.log(errorCheck);
    const element = document.getElementById("submit");
    if (
      !errorCheck.code ||
      !errorCheck.back ||
      !errorCheck.fabric ||
      !errorCheck.front ||
      !errorCheck.price
    ) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  }, [errorCheck]);
  useEffect(() => {
    console.log(res);
    if (res.message === "success") {
      notifySuccess("เพิ่มแบบสินค้าเรียบร้อย");
      navigate(`/product/cloth/${res.id}`);
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
    addProduct();
  };
  return (
    <div className="px-10 pb-20 ">
      <h1 className="text-3xl text-primary ">เพิ่มสินค้าเสื้อผ้า</h1>
      {addData && (
        <>
          <AddClothInfo data={addData} disable={disablebutton} />
          <AddClothImage />
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

export default AddClothProduct;
