import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { SelectInput } from "../../components";
import useDesignStore from "../../zustand/designState";
import Select from "../../components/Select";
const lableClassName = "max-lg:w-32 w-52 text-right";
const divclass =
  "flex w-1/2 max-lg:w-full py-3 items-center space-x-4 text-lg relative";
const EditDesign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [pattern, setPattern] = useState();
  const location = useLocation();
  const chooseCode = (e) => {};
  ////////////////////////////////
  //ZUSTAND///////////////////////
  ////////////////////////////////
  const setLoad = useAppState((state) => state.setLoad);
  const adddata = useDesignStore((state) => state.adddata);
  const loading = useDesignStore((state) => state.loading);
  const error = useDesignStore((state) => state.error);
  const getAddDesign = useDesignStore((state) => state.getAddDesign);
  const fetchSingleDesign = useDesignStore((state) => state.fetchSingleDesign);
  const singledata = useDesignStore((state) => state.singledata);

  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
    if (adddata) {
      setBrand(adddata?.designBrand);
      setCategory(adddata?.designCategory);
      setPattern(adddata?.designPattern);
    }
  }, [adddata]);
  useEffect(() => {
    getAddDesign();
  }, []);
  useEffect(() => {
    fetchSingleDesign(id);
  }, [id]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    console.log(singledata);
  }, [singledata]);
  ////////////////////////////////
  //Function///////////////////////
  ////////////////////////////////
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
  return (
    <div className="flex flex-wrap w-full">
      <div className={divclass}>
        <p className={lableClassName}>รหัส : </p>

        <p className={`text-center input `}>{id} </p>
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ชื่อ : </p>
        <input
          className="text-center input"
          type="text"
          name="name"
          placeholder={singledata?.design?.name}
          onChange={nameInput}
        />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> แบรนด์ : </p>
        <Select
          Data={brand}
          chooseMessage={chooseBrand}
          placeholder={singledata?.design?.brand}
        />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ประเภท : </p>
        <Select
          Data={category}
          chooseMessage={chooseCategory}
          placeholder={singledata?.design?.category}
        />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ช่างแพทเทิร์น : </p>
        <Select
          Data={pattern}
          chooseMessage={choosePattern}
          placeholder={singledata?.design?.pattern}
        />
      </div>
    </div>
  );
};

export default EditDesign;
