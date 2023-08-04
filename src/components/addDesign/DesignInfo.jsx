import React, { useEffect, useState } from "react";
import Select from "../Select";
import useDesignStore from "../../zustand/designState";

const DesignInfo = ({ data, disable }) => {
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [pattern, setPattern] = useState();
  const [codeError, setCodeError] = useState(false);

  const designData = useDesignStore((state) => state.designData);

  useEffect(() => {
    console.log(designData);
  }, [designData]);
  useEffect(() => {
    if (data) {
      setCode(data?.code?.map((code) => code?.Code));
      setBrand(data?.brand?.map((brand) => brand?.DesignBrand_Name));
      setCategory(
        data?.category?.map((category) => category?.Design_Category_Name)
      );
      setPattern(data?.pattern?.map((pattern) => pattern?.Pattern_Design_Name));
    }
  }, [data]);

  const chooseBrand = (message) => {
    if (message) {
      const [brandData] = data?.brand?.filter(
        (p) => p.DesignBrand_Name === message
      );
      if (brandData) {
        useDesignStore.setState((state) => ({
          ...state,
          designData: {
            ...state.designData,
            brand: brandData.DesignBrand_ID,
            brandname: brandData.DesignBrand_Name,
          },
        }));
      }
    }
  };
  const chooseCategory = (message) => {
    if (message) {
      const [categoryData] = data?.category?.filter(
        (p) => p.Design_Category_Name === message
      );
      if (categoryData) {
        useDesignStore.setState((state) => ({
          ...state,
          designData: {
            ...state.designData,
            category: categoryData.Design_Category_ID,
            categoryname: categoryData.Design_Category_Name,
          },
        }));
      }
    }
  };
  const choosePattern = (message) => {
    if (message) {
      const [patternData] = data?.pattern?.filter(
        (p) => p.Pattern_Design_Name === message
      );
      if (patternData) {
        useDesignStore.setState((state) => ({
          ...state,
          designData: {
            ...state.designData,
            pattern: patternData.Pattern_Design_ID,
            patternname: patternData.Pattern_Design_Name,
          },
        }));
      }
    }
  };
  const codeInput = (e) => {
    const checkCode = data?.code?.filter((p) => p.Code === e.target.value);
    if (checkCode.length > 0) {
      disable(true);
      setCodeError(true);
    } else {
      disable(false);
      setCodeError(false);
    }
    e.preventDefault();
    useDesignStore.setState((state) => ({
      ...state,
      designData: {
        ...state.designData,
        code: e.target.value,
      },
    }));
  };
  const nameInput = (e) => {
    e.preventDefault();
    useDesignStore.setState((state) => ({
      ...state,
      designData: {
        ...state.designData,
        name: e.target.value,
      },
    }));
  };
  const lableClassName = "max-lg:w-32 w-52 text-right";
  const divclass =
    "flex w-1/2 max-lg:w-full py-3 items-center space-x-4 text-lg relative";
  return (
    <div className="flex flex-wrap w-full">
      <div className={divclass}>
        <p className={lableClassName}>รหัส : </p>
        <input
          className={`text-center ${codeError ? "bg-red-200" : ""} input `}
          type="text"
          name="code"
          onChange={codeInput}
        />{" "}
        {codeError && (
          <p className="absolute text-xs text-red-500 right-2">
            รหัสมีในระบบแล้ว
          </p>
        )}
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ชื่อ : </p>
        <input
          className="text-center input"
          type="text"
          name="name"
          onChange={nameInput}
        />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> แบรนด์ : </p>
        <Select Data={brand} chooseMessage={chooseBrand} />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ประเภท : </p>
        <Select Data={category} chooseMessage={chooseCategory} />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ช่างแพทเทิร์น : </p>
        <Select Data={pattern} chooseMessage={choosePattern} />
      </div>
    </div>
  );
};

export default DesignInfo;
