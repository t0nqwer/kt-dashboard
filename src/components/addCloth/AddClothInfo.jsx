import React, { useEffect, useState } from "react";
import Select from "../Select";

const AddClothInfo = ({ data, disable }) => {
  console.log(data);
  const [ProductError, setProductError] = useState(false);
  const [code, setCode] = useState();
  const [fabric, setFabric] = useState();
  useEffect(() => {
    setCode(data.design.map((item) => item.Code));
    setFabric(
      data?.fabric?.map(
        (e) =>
          `ผ้า${e.Type.name}${e.Weaving.weaving_name}ย้อมสี${
            e.Color.FabricColorTechnique_name
          }${
            e?.Pattern?.FabricPatternName ? e?.Pattern?.FabricPatternName : ""
          }`
      )
    );
  }, [data]);
  const chooseCode = (message) => {
    if (message) {
      const [Select] = data?.design.filter((p) => p?.Code === message);
      // setInputdata({
      //   ...Inputdata,
      //   designName: Select?.Design_Name,
      //   code: Select?.Code,
      // });
    }
    if (!message) {
      // setInputdata({ ...Inputdata, designName: "", code: "" });
    }
  };
  const chooseFabric = (message) => {
    if (message) {
      const fabriccheck = data?.fabric?.map((e) => {
        return {
          name: `ผ้า${e.Type.name}${e.Weaving.weaving_name}ย้อมสี${e.Color.FabricColorTechnique_name}${
            e?.Pattern?.FabricPatternName ? e?.Pattern?.FabricPatternName : ""
          }`,
          id: e.Fabric_ID,
        };
      });
      const [Select] = fabriccheck.filter((p) => p?.name === message);
      // setInputdata({ ...Inputdata, fabric: Select?.name, fabric_id: Select?.id });
    }
    if (!message) {
      // setInputdata({ ...Inputdata, fabric: "", fabric_id: "" });
    }
  };
  const lableClassName = "w-32 text-right";
  const divclass =
    "flex w-1/2 max-lg:w-full py-3 items-center space-x-4 text-lg relative";
  return (
    <div className="flex flex-wrap w-full">
      <div className={divclass}>
        <p className={lableClassName}>ชื่อ : </p>
        <p
          className={`text-center ${ProductError ? "bg-red-200" : ""} input `}
          type="text"
          name="Product"
          // onChange={ProductInput}
        ></p>
        {ProductError && (
          <p className="absolute text-xs text-red-500 right-2">
            รหัสมีในระบบแล้ว
          </p>
        )}
      </div>
      <div className={divclass}>
        <p className={lableClassName}> รหัส : </p>
        <Select Data={code} chooseMessage={chooseCode} />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ผ้า : </p>
        <Select Data={fabric} chooseMessage={chooseFabric} />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> ราคา : </p>
        <input
          className="text-center input"
          type="text"
          name="name"
          // onChange={nameInput}
        />
      </div>
      <div className={divclass}>
        <p className={lableClassName}> คำอธิบาย : </p>
        <textarea
          className="text-center input"
          type="text"
          name="name"
          // onChange={nameInput}
        />
      </div>
    </div>
  );
};

export default AddClothInfo;
