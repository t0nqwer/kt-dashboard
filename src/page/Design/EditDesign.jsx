import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { SelectInput } from "../../components";
import useDesignStore from "../../zustand/designState";
import Select from "../../components/Select";
import { compare } from "../../function/array";
import { weights } from "../../assets/public";
import { notifySuccess, notify } from "../../function/notification";
import EditDesignSize from "../../components/Design/EditDesignSize";

const lableClassName = "max-lg:w-32 w-52 text-right";
const divclass =
  "flex w-1/2 max-lg:w-full py-3 items-center space-x-4 text-lg relative";
const EditDesign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [brand, setBrand] = useState();
  const [category, setCategory] = useState();
  const [pattern, setPattern] = useState();
  const [sizeList, setSizeList] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [sizeInputData, setSizeInputData] = useState([]);

  const location = useLocation();

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
  const designData = useDesignStore((state) => state.designData);
  const updateDesign = useDesignStore((state) => state.updateDesign);
  const res = useDesignStore((state) => state.res);
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
    setSizeList(singledata?.size.map((e) => e.size));
    setSizeData(singledata?.size[0]?.details?.map((e) => e.detail));
    console.log(singledata);
    setSizeInputData(
      singledata?.size
        .map((e) => {
          const data = e.details.map((p) => {
            return {
              id: `${e.size}-${p.detail}`,
              data: p.amount,
              size: e.size,
              detail: p.detail,
            };
          });
          return data;
        })
        .flat()
    );
  }, [singledata]);
  useEffect(() => {
    console.log(res);
    if (res.message === "success") {
      notifySuccess("แก้ไขข้อมูลเรียบร้อย");
      navigate(`/design/${res.id}`);
    }
  }, [res]);
  useEffect(() => {}, [adddata]);
  useEffect(() => {
    console.log(sizeInputData);
    if (sizeInputData?.length > 0) {
      useDesignStore.setState((state) => ({
        ...state,
        designData: {
          ...state.designData,
          sizeInput: sizeInputData,
        },
      }));
    }
  }, [sizeInputData]);
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
  const submitdata = (e) => {
    const sizeList = [...new Set(designData.sizeInput.map((e) => e.size))];
    const sizeData = [...new Set(designData.sizeInput.map((e) => e.detail))];
    if (sizeList.length * sizeData.length !== designData.sizeInput.length)
      return notify("โปรดกรอกขนาดให้ครบ");
    updateDesign(id);
  };
  const back = () => {
    navigate(-1);
  };
  return (
    <>
      {adddata && singledata && (
        <div className="maindiv">
          <div className="flex flex-wrap w-full">
            <div className="divclass">
              <p className="lableClassName">รหัส : </p>

              <p className={`text-center input `}>{id} </p>
            </div>
            <div className="divclass">
              <p className="lableClassName"> ชื่อ : </p>
              <input
                className="text-center input"
                type="text"
                name="name"
                placeholder={singledata?.design?.name}
                onChange={nameInput}
                onBlur={(e) => {
                  if (!e.target.value) {
                    e.target.value = singledata?.design?.name;
                  }
                }}
              />
            </div>
            <div className="divclass">
              <p className="lableClassName"> แบรนด์ : </p>
              <Select
                Data={brand}
                chooseMessage={chooseBrand}
                placeholder={singledata?.design?.brand}
              />
            </div>
            <div className="divclass">
              <p className="lableClassName"> ประเภท : </p>
              <Select
                Data={category}
                chooseMessage={chooseCategory}
                placeholder={singledata?.design?.category}
              />
            </div>
            <div className="divclass">
              <p className="lableClassName"> ช่างแพทเทิร์น : </p>
              <Select
                Data={pattern}
                chooseMessage={choosePattern}
                placeholder={singledata?.design?.pattern}
              />
            </div>
          </div>
          {/* SIZE */}
          <EditDesignSize
            sizeList={sizeList}
            sizeData={sizeData}
            setSizeList={setSizeList}
            setSizeData={setSizeData}
            sizeInputData={sizeInputData}
            setSizeInputData={setSizeInputData}
          />
          {/* SUBMIT */}
          <div className="flex items-center justify-between w-full ">
            <button
              id="submit"
              className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
              onClick={back}
            >
              Back
            </button>
            <button
              id="submit"
              className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
              onClick={submitdata}
            >
              บันทึก
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDesign;
