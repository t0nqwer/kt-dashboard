import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { SelectInput } from "../../components";
import useDesignStore from "../../zustand/designState";
import DesignInfo from "../../components/addDesign/DesignInfo";
import AddSize from "../../components/addDesign/AddSize";
import AddImage from "../../components/addDesign/AddImage";

const AddDesign = () => {
  const navigate = useNavigate();
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
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
    getAddDesign();
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
      {adddata && (
        <>
          <DesignInfo data={adddata} disable={disablebutton} />
          <AddSize data={adddata} disable={disablebutton} />
          <AddImage />
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

export default AddDesign;
