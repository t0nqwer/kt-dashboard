import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { SelectInput } from "../../components";
import useDesignStore from "../../zustand/designState";
const EditDesign = () => {
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

  return (
    <div>
      <SelectInput chooseMessage={chooseCode} />
    </div>
  );
};

export default EditDesign;
