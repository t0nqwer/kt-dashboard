import React from "react";
import useDesignStore from "../../zustand/designState";
import { weights } from "../../assets/public";
import { SelectInput } from "..";
import { compare } from "../../function/array";

const EditDesignSize = ({
  sizeList,
  sizeData,
  setSizeList,
  setSizeData,
  sizeInputData,
  setSizeInputData,
}) => {
  //////////////////////////////////////////////
  ////////////////////////////////////////////////
  const adddata = useDesignStore((state) => state.adddata);
  const singledata = useDesignStore((state) => state.singledata);

  //////////////////////////////////////////////
  ////////////////////////////////////////////////
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
    console.log(e.target.id);
    const id = e.target.id.split("-");
    const removedata = sizeInputData.filter((p) => p.id !== e.target.id);
    setSizeInputData([
      ...removedata,
      { id: e.target.id, data: e.target.value, size: id[0], detail: id[1] },
    ]);
  };
  return (
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
            <div key={e} className="flex w-full px-5 mb-2 rounded-md shadow-md">
              <h1 className="w-32 my-auto text-xl text-right">{e}</h1>
              <div className="flex flex-wrap p-2 grow">
                {sizeData?.map((p, index) => {
                  console.log(p);
                  return (
                    <div key={p} className="flex items-center mb-2 w-96 ">
                      <p className="w-48 text-right shrink-0">{p} : </p>
                      <input
                        id={`${e}-${p}`}
                        className="ml-1 text-center input"
                        placeholder={
                          singledata?.size
                            ?.find((data) => data.size === e)
                            ?.details?.find((data) => data.detail === p)?.amount
                        }
                        type="number"
                        name="size"
                        onChange={sizeInput}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditDesignSize;
