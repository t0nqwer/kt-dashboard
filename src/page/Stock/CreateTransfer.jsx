import React, { useEffect } from "react";
import Select from "../../components/Select";
import useTransferStore from "../../zustand/transferState";

const SearchProduct = (search) => {
  const products = useTransferStore((state) => state.products);
  if (products.length === 0) {
    return (
      <div>
        <p className="text-center text-red-500">โปรดเลือกสต๊อคต้นทาง</p>
      </div>
    );
  }
  return products.map((item) => {
    return <div></div>;
  });
};

const CreateTransfer = () => {
  const storeList = useTransferStore((state) => state.storeList);
  const products = useTransferStore((state) => state.products);
  const setFrom = useTransferStore((state) => state.setFrom);
  const setTo = useTransferStore((state) => state.setTo);
  const fetchProduct = useTransferStore((state) => state.fetchProduct);
  const fetchStore = useTransferStore((state) => state.fetchStore);
  const from = useTransferStore((state) => state.from);
  ///////////////////////
  useEffect(() => {
    fetchStore();
  }, []);
  useEffect(() => {
    if (from !== "") {
      fetchProduct(from);
    }
    if (from === "") {
      useTransferStore.setState((state) => ({ ...state, products: [] }));
    }
  }, [from]);
  //////////////////////
  const SelectFrom = () => {};
  const SelectTo = () => {};
  return (
    <div className="maindiv">
      <div className="flex w-full ">
        <div className="w-1/2 divclass">
          <p className="w-32 lableClassName"> จาก : </p>
          <Select
            Data={storeList}
            chooseMessage={setFrom}
            placeholder="เลือกสต๊อคต้นทาง"
          />
        </div>
        <div className="w-1/2 divclass">
          <p className="w-32 lableClassName"> ถึง : </p>
          <Select
            Data={storeList}
            chooseMessage={setTo}
            placeholder="เลือกสต๊อคปลายทาง"
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-1/3 divclass">
          <p className=" w-28 lableClassName"> name : </p>
          <input className="text-center input" placeholder="ชื่อสินค้า" />
        </div>
        <div className="w-1/3 divclass">
          <p className="w-28 lableClassName"> code : </p>
          <input className="text-center input" placeholder="รหัสเสื้อผ้า" />
        </div>
        <div className="w-1/3 divclass">
          <p className="w-28 lableClassName"> barcode : </p>
          <input className="text-center input" placeholder="บาร์โค้ด" />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-3 ">
        <div className="">
          <h1 className="text-xl">รายการสินค้าต้นทาง</h1>
          <SearchProduct search={[]} />
        </div>
        <div className="">
          <h1 className="text-xl">รายการสินค้าส่ง</h1>
          {/* <SearchProduct search={[]} /> */}
        </div>
      </div>
      <div className="flex justify-end space-x-3 ">
        <button className="btn">พิมพ์</button>
        <button className="btn">บันทึก</button>
        <button className="btn">ส่งสินค้า</button>
      </div>
    </div>
  );
};

export default CreateTransfer;
