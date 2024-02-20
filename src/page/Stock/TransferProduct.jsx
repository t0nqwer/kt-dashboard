import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTransferStore from "../../zustand/transferState";
import { useAppState } from "../../zustand/appState";
import useModalControlState from "../../zustand/modalControlState";

const TransferList = ({
  _id,
  localid,
  from,
  to,
  status,
  successAt,
  createdAt,
  setConfirmTransferModal,
  setConfirmId,
}) => {
  return (
    <li
      key={_id}
      className={`grid grid-cols-10 gap-1 px-5 py-3 text-center rounded-md mt-1  ${
        status === "transport"
          ? "bg-orange-500"
          : status === "success"
          ? "bg-green-500"
          : "bg-primary"
      } bg-opacity-10`}
    >
      <div className="flex items-center justify-start col-span-2">
        <div
          className={`w-3 h-3 mr-2 ${
            status === "transport"
              ? "bg-orange-500"
              : status === "success"
              ? "bg-green-500"
              : "bg-primary"
          } rounded-full`}
        ></div>
        {localid}
      </div>
      <div className="col-span-2 place-self-center">{from}</div>
      <div className="col-span-2 place-self-center">{to}</div>
      <div className="col-span-1 place-self-center">{createdAt}</div>
      <div className="col-span-1 place-self-center">
        {successAt ? successAt : "-"}
      </div>

      <div className="col-span-2 place-self-center">
        {status === "transport" ? (
          <button
            className="px-4 py-2 text-sm text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
            onClick={() => {
              setConfirmId(_id);
              setConfirmTransferModal(true);
            }}
          >
            ยืนยันการส่งสินค้า
          </button>
        ) : (
          "-"
        )}
      </div>
    </li>
  );
};

const TransferProduct = () => {
  const navigate = useNavigate();
  const isLoad = useAppState((state) => state.isLoad);
  const setLoad = useAppState((state) => state.setLoad);
  const { fetchTransferList, transferList, loading, setConfirmId } =
    useTransferStore();

  const { setConfirmTransferModal } = useModalControlState();

  useEffect(() => {
    fetchTransferList();
  }, []);
  useEffect(() => {
    setConfirmId("");
    setConfirmTransferModal(false);
  }, [transferList]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  return (
    <div className="maindiv">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl text-primary">รายการส่งสินค้า</h1>
        <button
          className="px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray"
          onClick={() => navigate("/stock/transfer/create")}
        >
          สร้างรายการส่งสินค้า
        </button>
      </div>
      <div className="mt-5 ">
        <ul>
          <li className="grid grid-cols-10 gap-1 px-5 py-3 mt-1 text-center rounded-md bg-slate-800 bg-opacity-10">
            <div className="col-span-2">TransferId</div>
            <div className="col-span-2">ต้นทาง</div>
            <div className="col-span-2">ปลายทาง</div>
            <div className="col-span-1">วันที่ส่ง</div>
            <div className="col-span-1">วันที่ส่งสำเร็จ</div>
            <div className="col-span-2">จัดการ</div>
          </li>
          {transferList.map((transfer) =>
            TransferList({
              ...transfer,
              setConfirmTransferModal: setConfirmTransferModal,
              setConfirmId: setConfirmId,
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default TransferProduct;
