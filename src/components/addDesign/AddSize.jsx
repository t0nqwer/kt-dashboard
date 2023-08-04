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
    const [selectdata] = data.size.filter((p) => p.Size_ID === e.target.id);
    if (e.target.id === "FREESIZE") {
      data.size.map((e) => {
        if (e.Size_ID !== "FREESIZE") {
          document.getElementById(e.Size_ID).checked = false;
        }
      });
      return setSizeList([selectdata]);
    }
    if (e.target.checked) {
      const arr = [...sizeList, selectdata];
      const sortdata = arr.sort(compare);
      document.getElementById("FREESIZE").checked = false;
      setSizeList(sortdata.filter((p) => p.Size_ID !== "FREESIZE"));
    }
    if (!e.target.checked) {
      setSizeList(sizeList.filter((p) => p.Size_ID !== e.target.id));
      const jio = sizeInputData.filter((p) => p?.size !== e.target.id);
      console.log(jio);
      setSizeInputData(sizeInputData.filter((p) => p?.size !== e.target.id));
    }
  };
  const SelectDeatilHandler = (e) => {
    const [selectdata] = data.sizeDetail.filter(
      (p) => p.Size_De_ID === +e.target.id
    );
    if (e.target.checked) {
      setSizeData([...sizeData, selectdata]);
    }
    if (!e.target.checked) {
      setSizeData(
        sizeData.filter((p) => p?.Size_De_ID?.toString() !== e.target.id)
      );
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
  return (
    <div className="mt-5">
      <div className={divclass}>
        <p className={lableClassName}>ไซส์ : </p>
        <div className="flex flex-wrap ">
          {data.size.map((e, index) => (
            <div
              key={e.Size_ID}
              className="flex items-center justify-center pr-10 text-base lg:text-lg "
            >
              <input
                id={`${e.Size_ID}`}
                className="w-5 h-5 focus:border focus:shadow-CS1 focus:shadow-secondary-500focus:border-secondary-500 focus:border-1 focus:outline-none"
                type="checkbox"
                onChange={SelectSizeHandler}
                checked={
                  sizeList.filter((p) => p.Size_ID === e.Size_ID).length > 0
                }
              ></input>
              <label className="ml-3">{e.Size_ID}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={divclass}>
        <p className={lableClassName}>รายละเอียด : </p>
        <div className="flex flex-wrap ">
          {data.sizeDetail.map((e, index) => (
            <div
              key={e.Size_De_ID}
              className="flex items-center justify-center pr-10 mb-3 text-base lg:text-lg"
            >
              <input
                id={`${e.Size_De_ID}`}
                className="w-5 h-5 focus:border focus:shadow-CS1 focus:shadow-secondary-500focus:border-secondary-500 focus:border-1 focus:outline-none"
                type="checkbox"
                onChange={SelectDeatilHandler}
                checked={
                  sizeData.filter((p) => p.Size_De_ID === e.Size_De_ID).length >
                  0
                }
              ></input>
              <label className="ml-3">{e.Size_De_Name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        {sizeList.map((e, index) => (
          <div
            key={e.Size_ID}
            className="flex w-full px-5 mb-2 rounded-md shadow-md"
          >
            <h1 className="w-32 my-auto text-xl text-right">{e.Size_ID}</h1>
            <div className="flex flex-wrap p-2 grow">
              {sizeData.map((p, index) => (
                <div
                  key={p.Size_De_ID}
                  className="flex items-center mb-2 w-96 "
                >
                  <p className="w-48 text-right shrink-0">
                    {p.Size_De_Name} :{" "}
                  </p>
                  <input
                    id={`${e.Size_ID}-${p.Size_De_ID}`}
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
