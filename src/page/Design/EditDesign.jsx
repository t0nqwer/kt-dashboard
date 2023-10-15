import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { SelectInput } from "../../components";
import useDesignStore from "../../zustand/designState";
import Select from "../../components/Select";
import { compare } from "../../function/array";
import { weights } from "../../assets/public";
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
  const designData = useDesignStore((state) => state.designData);
  const updateDesign = useDesignStore((state) => state.updateDesign);
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
  const SelectSizeHandler = (e) => {
    const selectdata = e.target.id;
    if (e.target.id === "FREESIZE") {
      adddata.size.map((e) => {
        if (e !== "FREESIZE") {
          document.getElementById(e).checked = false;
        }
      });
      return setSizeList(["FREESIZE"]);
    }
    if (e.target.checked) {
      const arr = [...sizeList, selectdata];
      const sortdata = arr.sort(compare);
      // document.getElementById("FREESIZE").checked = false;
      setSizeList(sortdata.filter((p) => p !== "FREESIZE"));
    }
    if (!e.target.checked) {
      setSizeList(sizeList.filter((p) => p !== e.target.id));
      setSizeInputData(sizeInputData.filter((p) => p.size !== e.target.id));
    }
  };
  const SelectDeatilHandler = (e) => {
    const selectdata = e.target.id;

    if (e.target.checked) {
      setSizeData([...sizeData, selectdata]);
    }
    if (!e.target.checked) {
      setSizeData(sizeData.filter((p) => p !== e.target.id));
      setSizeInputData(sizeInputData.filter((p) => p?.detail !== e.target.id));
    }
  };
  const sizeInput = (e) => {
    const id = e.target.id.split("-");
    const removedata = sizeInputData.filter((p) => p.id !== e.target.id);
    setSizeInputData([
      ...removedata,
      { id: e.target.id, data: e.target.value, size: id[0], detail: id[1] },
    ]);
  };
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
    // if (!designData.name) return notify("โปรดกรอกชื่อ");
    // if (!designData.code) return notify("โปรดกรอกรหัส");
    // if (!designData.brand) return notify("โปรดกรอกแบรนด์");
    // if (!designData.category) return notify("โปรดกรอกประเภท");
    // if (!designData.pattern) return notify("โปรดกรอกแพทเทิร์น");
    // if (!designData.size || designData.size.length === 0)
    //   return notify("โปรดกรอกขนาด");
    // if (
    //   designData.size.length * designData.sizeData.length !==
    //   designData.sizeInput.length
    // )
    //   return notify("โปรดกรอกขนาดให้ครบ");
    // if (!designData.FrontImage) return notify("โปรดเลือกรูปด้านหน้า");
    // if (!designData.BackImage) return notify("โปรดเลือกรูปด้านหลัง");
    updateDesign(id);
    console.log(designData);
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
          <div className="mt-5">
            <div className="w-full divclass">
              <p className="lableClassName shrink-0">ไซส์ : </p>
              <div className="flex flex-wrap ">
                {adddata.size.map((e, index) => (
                  <div
                    key={e}
                    className="flex items-center justify-center pr-10 text-base lg:text-lg "
                  >
                    <input
                      id={`${e}`}
                      className="w-5 h-5 focus:border focus:shadow-CS1 focus:shadow-secondary-500focus:border-secondary-500 focus:border-1 focus:outline-none"
                      type="checkbox"
                      onChange={SelectSizeHandler}
                      checked={sizeList?.filter((p) => p === e).length > 0}
                    ></input>
                    <label className="ml-3">{e}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full divclass ">
              <p className="lableClassName shrink-0">รายละเอียด : </p>
              <div className="flex flex-wrap w-full ">
                {adddata.sizeDetails.map((e, index) => (
                  <div
                    key={e}
                    className="flex items-center justify-center pr-10 mb-3 text-base lg:text-lg"
                  >
                    <input
                      id={`${e}`}
                      className="w-5 h-5 focus:border focus:shadow-CS1 focus:shadow-secondary-500focus:border-secondary-500 focus:border-1 focus:outline-none"
                      type="checkbox"
                      onChange={SelectDeatilHandler}
                      checked={sizeData?.filter((p) => p === e).length > 0}
                    ></input>
                    <label className="ml-3">{e}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {sizeList
                ?.sort((a, b) => weights[a] - weights[b])
                ?.map((e, index) => (
                  <div
                    key={e}
                    className="flex w-full px-5 mb-2 rounded-md shadow-md"
                  >
                    <h1 className="w-32 my-auto text-xl text-right">{e}</h1>
                    <div className="flex flex-wrap p-2 grow">
                      {sizeData?.map((p, index) => (
                        <div key={p} className="flex items-center mb-2 w-96 ">
                          <p className="w-48 text-right shrink-0">{p} : </p>
                          <input
                            id={`${e}-${p}`}
                            className="ml-1 text-center input"
                            placeholder={
                              singledata?.size
                                ?.find((data) => data.size === e)
                                ?.details?.find((data) => data.detail === p)
                                ?.amount
                            }
                            type="text"
                            name="code"
                            onChange={sizeInput}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* SUBMIT */}
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
      )}
    </>
  );
};

export default EditDesign;
