import React, { useEffect, useState } from "react";
import useDesignStore from "../../zustand/designState";
import { compare } from "../../function/array";
const AddSize = ({ data, disable }) => {
  const [sizeList, setSizeList] = useState([]);
  const [sizeData, setSizeData] = useState([]);
  const [sizeInputData, setSizeInputData] = useState([]);
  const lableClassName = "max-lg:w-32 w-52 text-right  shrink-0";
  const divclass = "flex w-full max-lg:w-full py-3 space-x-4 text-lg relative ";
  const SelectSizeHandler = (e) => {
    const selectdata = e.target.id;
    if (e.target.id === "FREESIZE") {
      data.size.map((e) => {
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
      setSizeInputData(sizeInputData.filter((p) => p !== e.target.id));
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
  useEffect(() => {
    useDesignStore.setState((state) => ({
      ...state,
      designData: {
        ...state.designData,
        size: sizeList,
      },
    }));
  }, [sizeList]);
  useEffect(() => {
    useDesignStore.setState((state) => ({
      ...state,
      designData: {
        ...state.designData,
        sizeData: sizeData,
      },
    }));
  }, [sizeData]);

  const sizeInput = (e) => {
    const id = e.target.id.split("-");
    const removedata = sizeInputData.filter((p) => p.id !== e.target.id);
    setSizeInputData([
      ...removedata,
      { id: e.target.id, data: e.target.value, size: id[0], detail: id[1] },
    ]);
  };
  useEffect(() => {
    useDesignStore.setState((state) => ({
      ...state,
      designData: {
        ...state.designData,
        sizeInput: sizeInputData,
      },
    }));
  }, [sizeInputData]);
  console.log(data);
  return (
    <div className="mt-5">
      <div className={divclass}>
        <p className={lableClassName}>ไซส์ : </p>
        <div className="flex flex-wrap ">
          {data.size.map((e, index) => (
            <div
              key={e}
              className="flex items-center justify-center pr-10 text-base lg:text-lg "
            >
              <input
                id={`${e}`}
                className="w-5 h-5 focus:border focus:shadow-CS1 focus:shadow-secondary-500focus:border-secondary-500 focus:border-1 focus:outline-none"
                type="checkbox"
                onChange={SelectSizeHandler}
                checked={sizeList.filter((p) => p === e).length > 0}
              ></input>
              <label className="ml-3">{e}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={divclass}>
        <p className={lableClassName}>รายละเอียด : </p>
        <div className="flex flex-wrap ">
          {data.sizeDetails.map((e, index) => (
            <div
              key={e}
              className="flex items-center justify-center pr-10 mb-3 text-base lg:text-lg"
            >
              <input
                id={`${e}`}
                className="w-5 h-5 focus:border focus:shadow-CS1 focus:shadow-secondary-500focus:border-secondary-500 focus:border-1 focus:outline-none"
                type="checkbox"
                onChange={SelectDeatilHandler}
                checked={sizeData.filter((p) => p === e).length > 0}
              ></input>
              <label className="ml-3">{e}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        {sizeList.map((e, index) => (
          <div key={e} className="flex w-full px-5 mb-2 rounded-md shadow-md">
            <h1 className="w-32 my-auto text-xl text-right">{e}</h1>
            <div className="flex flex-wrap p-2 grow">
              {sizeData.map((p, index) => (
                <div key={p} className="flex items-center mb-2 w-96 ">
                  <p className="w-48 text-right shrink-0">{p} : </p>
                  <input
                    id={`${e}-${p}`}
                    className="ml-1 text-center input"
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
  );
};

export default AddSize;
