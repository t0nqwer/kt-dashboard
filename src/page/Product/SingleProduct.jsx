import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import useProductStore from "../../zustand/productState";
import { Thai } from "../../function/currency";
import { AiOutlineClose } from "react-icons/ai";

import useModalControlState from "../../zustand/modalControlState";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  ////////////////////////////////
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useProductStore((state) => state.loading);
  const singledata = useProductStore((state) => state.singledata);
  const fetchSingleKhwanta = useProductStore(
    (state) => state.fetchSingleKhwanta
  );
  const setChangeProductClothPrice = useModalControlState(
    (state) => state.setChangeProductClothPrice
  );
  const addDetailImage = useProductStore((state) => state.addDetailImage);
  const setDetailImage = useProductStore((state) => state.setDetailImage);
  const setDeleteProductDetailImage = useModalControlState(
    (state) => state.setDeleteProductDetailImage
  );
  ///////////////////////////////
  useEffect(() => {
    fetchSingleKhwanta(id);
  }, [id]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  const addimage = (e) => {
    console.log(singledata);
    addDetailImage(e.target.files[0], singledata?._id);
  };
  ////////////////////////////////
  return (
    <div className="px-10 pb-10 ">
      <div className="flex">
        {/* Image */}
        <div>
          <div className="w-[315px] h-[420px] relative rounded overflow-hidden bg-secondary-cream">
            <img
              src={singledata?.frontImage}
              className="absolute object-contain w-full h-full "
              alt=""
            />
          </div>
          <div className="w-[315px] h-[420px] relative rounded overflow-hidden mt-3 bg-secondary-cream">
            <img
              src={singledata?.backImage}
              className="absolute object-contain w-full h-full "
              alt=""
            />
          </div>
        </div>
        <div className="w-full px-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {singledata?.name}
              </h1>
            </div>
            <div className="flex items-center justify-center p-2 space-x-5 rounded ">
              <p className="text-2xl font-bold text-gray-800">
                {Thai.format(singledata?.price)}
              </p>
              <div
                className="p-2 cursor-pointer hover:bg-secondary-red text-primary hover:text-secondary-light"
                onClick={() => {
                  setChangeProductClothPrice(true);
                }}
              >
                <BiEditAlt className="text-xl cursor-pointer " />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 mt-5 border-t border-primary">
            <div className="flex items-baseline justify-start mt-5 space-x-4 ">
              <p className="text-lg text-gray-600">แบรนด์</p>
              <h1 className="text-xl font-bold text-gray-800">
                {singledata?.supplier}
              </h1>
            </div>
            <div className="flex items-baseline justify-start mt-5 space-x-4">
              <p className="text-lg text-gray-600">ประเภท</p>
              <h1 className="text-xl font-bold text-gray-800">
                {singledata?.category}
              </h1>
            </div>
          </div>
          <div className="mt-5 border-t border-primary"></div>
          <div className="mt-5 border-t border-primary">
            <div className="mt-5 text-xl"> Barcode </div>
            <div className="mt-4">
              <span className="px-3 py-2 mr-4 border rounded-md cursor-pointer ">
                {singledata?.barcode.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="border-t mt-7 border-primary">
            <div className="flex items-center justify-between">
              <h1 className="mt-5 text-xl"> รูปราลละเอียด</h1>
              <label className="p-2 mt-5 rounded hover:bg-secondary-red text-primary hover:text-secondary-light">
                <input type="file" hidden onChange={addimage} />
                <BiPlus className="text-3xl cursor-pointer " />
              </label>
            </div>
            <div className="w-full h-[300px] mt-3 overflow-y-scroll bg-secondary-cream flex flex-wrap ">
              {singledata?.DetailImage?.map((item) => (
                <div key={item} className=" relative w-[210px] h-[280px] p-3">
                  <div
                    className="absolute p-1 text-xs text-red-800 rounded-full top-5 right-5 outline outline-primary outline-1 hover:text-white hover:bg-primary hover:scale-125 "
                    onClick={() => {
                      setDetailImage(item);
                      setDeleteProductDetailImage(true);
                    }}
                  >
                    <AiOutlineClose />
                  </div>
                  <img
                    src={item}
                    className="object-cover w-full h-full"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
