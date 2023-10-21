import React, { useEffect, useState } from "react";
import { notify } from "../../function/notification";
import { MdOutlineCheck, MdOutlineClose } from "react-icons/md";
import useModalControlState from "../../zustand/modalControlState";
import useFabricStore from "../../zustand/fabricState";

const FabricWeaving = () => {
  const [info, setInfo] = useState("");
  const addWeaving = useFabricStore((state) => state.addWeaving);
  const setFabricWeavingModal = useModalControlState(
    (state) => state.setFabricWeavingModal
  );
  return (
    <div className="absolute flex animate-fadein justify-center items-center top-0 left-0 w-screen h-screen p-10 rounded-md bg-primary backdrop-blur-lg bg-opacity-50 max-md:p-0 z-[8888]">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-secondary-cream">
        <p className="text-3xl ">กรอกชื่อเทคนิคการทอ</p>
        <div className="h-12 mt-5 text-center ">
          <input
            type="text"
            className="input"
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="px-5 py-2 mt-5 mr-5 text-lg font-semibold text-white transition-all bg-red-900 rounded-md hover:bg-red-500 hover:scale-125 active:bg-red-800 active:scale-110"
            onClick={() => {
              setInfo("");
              setFabricWeavingModal(false);
            }}
          >
            <MdOutlineClose />
          </button>
          <button
            className="px-5 py-2 mt-5 text-lg font-semibold text-white transition-all bg-green-900 rounded-md hover:bg-green-500 hover:scale-125 active:bg-green-800 active:scale-110"
            onClick={() => {
              if (info === "") return notify("กรุณากรอกข้อมูลให้ครบถ้วน");
              setFabricWeavingModal(false);
              addWeaving(info);
              setInfo("");
            }}
          >
            <MdOutlineCheck />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FabricWeaving;
