import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { SelectInput } from "../../components";
import useDesignStore from "../../zustand/designState";
import DesignInfo from "../../components/addDesign/DesignInfo";
import AddSize from "../../components/addDesign/AddSize";
import AddImage from "../../components/addDesign/AddImage";

import { notify, notifySuccess } from "../../function/notification";

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
  const designData = useDesignStore((state) => state.designData);
  const getAddDesign = useDesignStore((state) => state.getAddDesign);
  const createDesign = useDesignStore((state) => state.createDesign);
  const res = useDesignStore((state) => state.res);
  ////////////////////////////////
  useEffect(() => {
    getAddDesign();
  }, []);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    if (res === "success") {
      notifySuccess("เพิ่มแบบสินค้าเรียบร้อย");
      navigate(`/design/${designData.code}`);
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
    if (!designData.name) return notify("โปรดกรอกชื่อ");
    if (!designData.code) return notify("โปรดกรอกรหัส");
    if (!designData.brand) return notify("โปรดกรอกแบรนด์");
    if (!designData.category) return notify("โปรดกรอกประเภท");
    if (!designData.pattern) return notify("โปรดกรอกแพทเทิร์น");
    if (!designData.size || designData.size.length === 0)
      return notify("โปรดกรอกขนาด");
    if (
      designData.size.length * designData.sizeData.length !==
      designData.sizeInput.length
    )
      return notify("โปรดกรอกขนาดให้ครบ");
    if (!designData.FrontImage) return notify("โปรดเลือกรูปด้านหน้า");
    if (!designData.BackImage) return notify("โปรดเลือกรูปด้านหลัง");
    createDesign();
    console.log(designData);
  };
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
