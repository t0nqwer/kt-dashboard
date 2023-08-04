import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDesignStore from "../../zustand/designState";
import { useAppState } from "../../zustand/appState";
import { Card, Pagination } from "../../components";
import { AiOutlineSearch } from "react-icons/ai";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Design = () => {
  const navigate = useNavigate();
  const qurey = useQuery();
  const page = qurey.get("page") || 1;
  const search = qurey.get("search") || "";
  const searchInput = useRef(null);
  ////////////////////////////////
  //ZUSTAND
  ////////////////////////////////
  const design = useDesignStore((state) => state.design);
  const pageAll = useDesignStore((state) => state.pageAll);
  const loading = useDesignStore((state) => state.loading);
  const error = useDesignStore((state) => state.error);
  const res = useDesignStore((state) => state.res);
  const fetchDesign = useDesignStore((state) => state.fetchDesign);
  const setLoad = useAppState((state) => state.setLoad);
  ////////////////////////////////
  useEffect(() => {
    fetchDesign(page, search);
  }, [page, search]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  useEffect(() => {}, [design, pageAll]);
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/design?page=${page}&search=${searchInput.current.value}`);
  };

  return (
    <div id="design" className="p-5 ">
      <div className="sticky top-0 z-[2000] flex justify-center w-full space-x-10 ">
        <div className=" rounded-lg overflow-hidden border bg-white border-primary text-xl py-2 px-3 md:w-[400px] w-full flex bg-primary-500 items-center text-secondary-primary">
          <form className=" grow" onSubmit={handleSearch}>
            <input
              type="text"
              className="w-full pl-2 focus:outline-none"
              placeholder="ค้นหา...."
              ref={searchInput}
            />
            <input type="submit" hidden />
          </form>
          <div className="cursor-pointer " onClick={handleSearch}>
            <AiOutlineSearch />
          </div>
        </div>
        <button
          className="px-5 py-2 text-white rounded-md bg-primary hover:bg-opacity-20 hover:text-primary"
          onClick={() => navigate("/design/add")}
        >
          เพิ่มสินค้า
        </button>
      </div>
      <div className="grid grid-cols-4 mt-5 gap-y-8">
        {design.map((item, index) => (
          <div
            key={item.Code}
            className="p-3 mx-auto rounded-md cursor-pointer hover:shadow-md"
            onClick={() => navigate(`/design/${item.Code}`)}
          >
            <Card
              data={item}
              img={item?.Front_Thumbnail}
              Maintext={item?.Code}
              Subtext1={item?.Design_Name}
            />
          </div>
        ))}
      </div>
      <Pagination page={page} pageAll={pageAll} pathname={`/design?`} />
    </div>
  );
};

export default Design;
