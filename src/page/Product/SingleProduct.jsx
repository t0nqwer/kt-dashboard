import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import useProductStore from "../../zustand/productState";
import { Thai } from "../../function/currency";

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
  ///////////////////////////////
  useEffect(() => {
    fetchSingleKhwanta(id);
  }, [id]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  useEffect(() => {
    console.log(singledata);
  }, [singledata]);
  ////////////////////////////////
  return (
    <div className="px-10 pb-10 ">
      <div className="flex">
        {/* Image */}
        <div>
          <div className="w-[315px] h-[420px] relative rounded overflow-hidden bg-secondary-cream">
            <img
              src={singledata?.Front_img}
              className="absolute object-contain w-full h-full "
              alt=""
            />
          </div>
          <div className="w-[315px] h-[420px] relative rounded overflow-hidden mt-3 bg-secondary-cream">
            <img
              src={singledata?.Back_img}
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
            <div
              className="flex items-center justify-center p-2 space-x-5 rounded "
              onClick={() => navigate(`/designedit/${id}`)}
            >
              <p className="text-2xl font-bold text-gray-800">
                {Thai.format(singledata?.price)}
              </p>
              <div className="p-2 hover:bg-secondary-red text-primary hover:text-secondary-light">
                <BiEditAlt className="text-xl cursor-pointer " />
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 mt-5 border-t border-primary">
            <div className="flex items-baseline justify-start mt-5 space-x-4 ">
              <p className="text-lg text-gray-600">แบรนด์</p>
              <h1 className="text-xl font-bold text-gray-800">
                {singledata?.supplier?.name}
              </h1>
            </div>
            <div className="flex items-baseline justify-start mt-5 space-x-4">
              <p className="text-lg text-gray-600">ประเภท</p>
              <h1 className="text-xl font-bold text-gray-800">
                {singledata?.category?.name}
              </h1>
            </div>
          </div>
          <div className="mt-5 border-t border-primary"></div>
          <div className="mt-5 border-t border-primary">
            <div className="mt-5 text-xl"> Barcode </div>
            <div className="mt-4">
              {singledata?.Stock_Info.map((item) => (
                <span
                  key={item.Barcode}
                  className="px-3 py-2 mr-4 border rounded-md cursor-pointer "
                >
                  {item.Barcode}
                </span>
              ))}
            </div>
          </div>
          <div className="border-t mt-7 border-primary">
            <div className="flex items-center justify-between">
              <h1 className="mt-5 text-xl"> รูปราลละเอียด</h1>
              <label className="p-2 mt-5 rounded hover:bg-secondary-red text-primary hover:text-secondary-light">
                <input type="file" hidden />
                <BiPlus className="text-3xl cursor-pointer " />
              </label>
            </div>
            <div className="w-full h-[300px] mt-3 overflow-y-scroll bg-secondary-cream flex flex-wrap ">
              {singledata?.Product_Cloth_Detail?.map((item) => (
                <div key={item.Img_Url} className="w-[210px] h-[280px] p-3">
                  <img
                    src={item.Img_Url}
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
