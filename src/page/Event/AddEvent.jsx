import React, { useEffect, useState } from "react";
import Select from "../../components/Select";
import FrontImage from "../../components/images/Front";

const AddEvent = () => {
  const [FrontURL, setFrontURL] = useState("");
  const [Front, setFront] = useState();

  const [data, setData] = useState({
    name: "",
    address: "",
    openDate: "",
    closeDate: "",
    type: "",
  });
  const onSelectFrontFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFront("");
      return;
    }
    setFront(e.target.files[0]);
  };
  useEffect(() => {
    if (!Front) {
      setFrontURL("");
      return;
    }
    setData((prev) => ({ ...prev, FrontImage: Front }));
    const objectUrl = URL.createObjectURL(Front);
    setFrontURL(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [Front]);
  const shoptype = ["store", "event"];
  const chooseShopType = (message) => {};
  const submitdata = () => {};
  return (
    <div className="maindiv">
      <div className="flex w-full">
        <div className="flex flex-wrap w-full">
          <div className="w-1/2 divclass ">
            <p className="w-40 lableClassName"> ชื่อร้าน : </p>
            <input
              className="input"
              type="text"
              name="name"
              value={data?.name}
              onChange={(e) =>
                setData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="w-1/2 divclass">
            <p className="w-40 lableClassName"> ที่อยู่ : </p>
            <textarea
              className="input"
              type="text"
              name="address"
              value={data?.address}
              onChange={(e) =>
                setData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="w-1/2 divclass">
            <p className="w-40 lableClassName"> วันเปิด : </p>
            <input
              className="input"
              type="date"
              name="openDate"
              value={data?.openDate}
              onChange={(e) =>
                setData((prev) => ({ ...prev, openDate: e.target.value }))
              }
            />
          </div>
          <div className="w-1/2 divclass">
            <p className="w-40 lableClassName"> วันปิด : </p>
            <input
              className="input"
              type="date"
              name="closeDate"
              value={data?.closeDate}
              onChange={(e) =>
                setData((prev) => ({ ...prev, closeDate: e.target.value }))
              }
            />
          </div>
          <div className="w-1/2 divclass">
            <p className="w-40 lableClassName"> ประเภท : </p>
            <Select Data={shoptype} chooseMessage={chooseShopType} />
          </div>
        </div>
      </div>
      <div className="pr-8 w-fit">
        <h1 className="mb-2 text-2xl text-secondary-500">รูปด้านหน้า</h1>
        <div className="relative w-64 mt-4 mb-4 overflow-hidden">
          <label className="flex items-center justify-center w-64 py-2 tracking-wide border rounded-lg shadow-lg cursor-pointer hover:bg-primary hover:text-secondary-light border-primary active:bg-secondary-700 active:text-primary-600 ">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 ml-3 text-base leading-normal">
              Select a file
            </span>
            <input
              type="file"
              className="hidden"
              onChange={onSelectFrontFile}
            />
          </label>
        </div>
        <div className="w-64 overflow-hidden rounded-md h-96 outline-dashed outline-1">
          {FrontURL === "" ? (
            ""
          ) : (
            <img src={FrontURL} className="object-contain w-full h-full" />
          )}
        </div>
      </div>
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
  );
};

export default AddEvent;
