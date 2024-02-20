import React, { useState, useEffect } from "react";
import useModalControlState from "../../zustand/modalControlState";
import { IoClose } from "react-icons/io5";
import useTransferStore from "../../zustand/transferState";
import { notify } from "../../function/notification";

const ConfirmTransferImage = ({ onSelectFile, file }) => {
  return (
    <label className="flex items-center justify-center w-64 py-2 tracking-wide border rounded-lg shadow-lg cursor-pointer hover:bg-primary hover:text-secondary-light border-primary active:bg-secondary-700 active:text-primary-600 ">
      <svg
        className="w-8 h-8"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
      </svg>
      <span className="mt-2 ml-3 text-base leading-normal">Select a file</span>
      <input type="file" className="hidden" onChange={onSelectFile} />
    </label>
  );
};

const ConfirmTransfer = () => {
  const [File, setFile] = useState();
  const [FileName, setFileName] = useState("");
  const { confirmTransferModal, setConfirmTransferModal } =
    useModalControlState();
  const { confirmId, setConfirmId, confirmTransfer } = useTransferStore();
  const SelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile("");
      return;
    }
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!File) {
      console.log("no file");
      setFileName("");
      return;
    }

    setFileName(File.name);
  }, [File]);
  const confirm = () => {
    if (!File) {
      notify("กรุณาเลือกไฟล์");
      return;
    }

    confirmTransfer(confirmId, File);
  };
  return (
    <div className="absolute flex animate-fadein justify-center items-center top-0 left-0 w-screen h-screen p-10 rounded-md bg-primary backdrop-blur-lg bg-opacity-50 max-md:p-0 z-[8888]">
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 bg-secondary-cream">
        <p className="text-3xl "> อัพโหลดเอกสารรับสินค้า</p>
        <div className="py-3 ">
          {FileName ? (
            <div className="flex items-center space-x-5">
              <p className="truncate w-52">{FileName} </p>
              <button
                className="text-xl text-red-500 place-self-center hover:text-red-400"
                onClick={() => setFile()}
              >
                <IoClose />
              </button>
            </div>
          ) : (
            <ConfirmTransferImage onSelectFile={SelectFile} file={FileName} />
          )}
          <p className="mt-3 text-sm text-center text-red-500">
            * อัพโหลดไฟล์รูปภาพเท่านั้น
          </p>
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="px-5 py-2 mt-5 mr-5 text-lg font-semibold text-white transition-all bg-red-900 rounded-md hover:bg-red-500 active:bg-red-800 active:scale-110"
            onClick={() => {
              setConfirmId("");
              setConfirmTransferModal(false);
            }}
          >
            ยกเลิก
          </button>
          <button
            className="px-5 py-2 mt-5 text-lg font-semibold text-white transition-all bg-green-900 rounded-md hover:bg-green-500 active:bg-green-800 active:scale-110"
            onClick={confirm}
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransfer;
