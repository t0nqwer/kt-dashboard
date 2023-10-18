import React, { useEffect, useState } from "react";
import Select from "../Select";
import useProductStore from "../../zustand/productState";

const AddClothInfo = ({ data, disable }) => {
  const [ProductError, setProductError] = useState(false);
  const [code, setCode] = useState();
  const [fabric, setFabric] = useState();
  const [designName, setDesignName] = useState("");
  const [fabricName, setFabricName] = useState("");

  const productData = useProductStore((state) => state.productData);

  useEffect(() => {
    if (!productData?.code && !productData?.fabric) return;
    const [checkcode] = data?.design?.filter(
      (e) => e.code === productData?.code
    );
    const [checkfabric] = data?.fabric?.filter(
      (e) => e.name === productData?.fabric
    );
    const checkProduct = data.product.filter(
      (e) => e.design === checkcode?._id && e.fabric === checkfabric?._id
    );
    console.log(checkcode, checkfabric, checkProduct);
    if (checkcode) {
      setDesignName(checkcode.name);
    } else {
      setDesignName("");
    }
    if (checkfabric) {
      setFabricName(checkfabric.name);
    } else {
      setFabricName("");
    }
    if (checkProduct.length >= 1) {
      setProductError(true);
      disable(true);
    } else {
      disable(false);
      setProductError(false);
    }
  }, [productData]);
  useEffect(() => {
    console.log(data);
    setCode(data?.design?.map((item) => item.code));
    setFabric(data?.fabric?.map((e) => e.name));
  }, [data]);
  const chooseCode = (message) => {
    if (message) {
      useProductStore.setState((state) => ({
        ...state,
        productData: {
          ...state.productData,
          code: message,
        },
      }));
    }
    if (!message) {
      useProductStore.setState((state) => ({
        ...state,
        productData: {
          ...state.productData,
          code: "",
        },
      }));
    }
  };
  const chooseFabric = (message) => {
    if (message) {
      useProductStore.setState((state) => ({
        ...state,
        productData: {
          ...state.productData,
          fabric: message,
        },
      }));
    }
    if (!message) {
      useProductStore.setState((state) => ({
        ...state,
        productData: {
          ...state.productData,
          fabric: "",
        },
      }));
    }
  };
  const priceInput = (message) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: {
        ...state.productData,
        price: message.target.value,
      },
    }));
  };
  const descriptionInput = (message) => {
    useProductStore.setState((state) => ({
      ...state,
      productData: {
        ...state.productData,
        description: message.target.value,
      },
    }));
  };
  const lableClassName = "w-32 text-right";
  const divclass =
    "flex w-1/2 max-lg:w-full py-3 items-center space-x-4 text-lg relative";
  return (
    <div className="flex flex-wrap w-full">
      <div className={divclass}>
        <p className={lableClassName}>ชื่อ : </p>
        <p
          className={`text-center ${ProductError ? "bg-red-200" : ""} input `}
          type="text"
          name="Product"
        >
          {designName}
          {fabricName}
        </p>
        {ProductError && (
          <p className="absolute text-xs text-red-500 right-2">
            สินค้ามีในระบบแล้ว
          </p>
        )}
      </div>
      <div className={divclass}>
        <p className={lableClassName}> รหัส : </p>
        <Select Data={code} chooseMessage={chooseCode} />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ผ้า : </p>
        <Select Data={fabric} chooseMessage={chooseFabric} />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ราคา : </p>
        <input
          className="text-center input"
          type="number"
          name="name"
          onChange={priceInput}
        />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> คำอธิบาย : </p>
        <textarea
          className="text-center input"
          type="text"
          name="name"
          onChange={descriptionInput}
        />
      </div>
    </div>
  );
};

export default AddClothInfo;
