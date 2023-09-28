import React, { useEffect, useState } from "react";
import Select from "../Select";
import useDesignStore from "../../zustand/designState";

const DesignInfo = ({ data, disable }) => {
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [pattern, setPattern] = useState();
  const [codeError, setCodeError] = useState(false);

  const designData = useDesignStore((state) => state.designData);

  useEffect(() => {
    if (data) {
      setBrand(data?.designBrand);
      setCategory(data?.designCategory);
      setPattern(data?.designPattern);
    }
  }, [data]);

  const chooseBrand = (message) => {
    if (message) {
      useDesignStore.setState((state) => ({
        ...state,
        designData: {
          ...state.designData,
          brand: message,
        },
      }));
    }
  };
  const chooseCategory = (message) => {
    if (message) {
      useDesignStore.setState((state) => ({
        ...state,
        designData: {
          ...state.designData,
          category: message,
        },
      }));
    }
  };
  const choosePattern = (message) => {
    if (message) {
      useDesignStore.setState((state) => ({
        ...state,
        designData: {
          ...state.designData,
          pattern: message,
        },
      }));
    }
  };
  const codeInput = (e) => {
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
        />
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
