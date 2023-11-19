import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "../../function/notification";
import { useAppState } from "../../zustand/appState";
import useProductStore from "../../zustand/productState";
import AddExampleInfo from "../../components/addExample/AddExampleInfo";
import AddExampleImage from "../../components/addExample/AddExampleImage";

const AddExampleProduct = () => {
  const navigate = useNavigate();

  const [errorCheck, setErrorCheck] = useState({
    name: false,
    category: false,
    price: false,
    front: false,
    back: false,
  });
  /////////////////////

  /////////////////////
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useProductStore((state) => state.loading);
  const addData = useProductStore((state) => state.addData);
  const getAddExampleProduct = useProductStore(
    (state) => state.getAddExampleProduct
  );
  const productData = useProductStore((state) => state.productData);
  const addExampleProduct = useProductStore((state) => state.addExampleProduct);
  const res = useProductStore((state) => state.res);

  /////////////////////////////

  ////////////////////////////
  useEffect(() => {
    getAddExampleProduct();
  }, []);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    console.log(errorCheck);
    const checkCategory = addData?.categories?.filter(
      (e) => e === productData.category
    );
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
  const disablebutton = (e) => {
    const element = document.getElementById("submit");
    if (e) {
      element.disabled = true;
    } else {
      element.disabled = false;
    }
  };
  useEffect(() => {
    if (
      errorCheck.name &&
      errorCheck.category &&
      errorCheck.price &&
      errorCheck.front &&
      errorCheck.back
    ) {
      disablebutton(false);
    } else {
      disablebutton(true);
    }
  }, [errorCheck]);
  useEffect(() => {
    console.log(res);
    if (res.message === "success") {
      notifySuccess("เพิ่มแบบสินค้าเรียบร้อย");
      navigate(`/product/example/${res.id}`);
    }
  }, [res]);
  const submitdata = (e) => {
    addExampleProduct();
  };
  return (
    <div className="px-10 pb-20 ">
      <h1 className="text-3xl text-primary ">เพิ่มสินค้าตัวอย่าง</h1>
      {addData && (
        <>
          <AddExampleInfo data={addData} disable={disablebutton} />
          <AddExampleImage />
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

export default AddExampleProduct;
