import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../Pagination";
import useProductStore from "../../zustand/productState";
import Card from "../Card";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Example = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split("/");
  const pathName = pathArray[pathArray.length - 1];
  const qurey = useQuery();
  const page = qurey.get("page") || 1;
  const search = qurey.get("search") || "";
  const searchInput = useRef(null);
  ////////////////////////////////
  //ZUSTAND///////////////////////
  ////////////////////////////////
  const setLoad = useAppState((state) => state.setLoad);
  const loading = useProductStore((state) => state.loading);
  const product = useProductStore((state) => state.product);
  const pageAll = useProductStore((state) => state.pageAll);
  const error = useProductStore((state) => state.error);
  const fetchExampleProduct = useProductStore(
    (state) => state.fetchExampleProduct
  );
  const setProduct = useProductStore((state) => state.setProduct);
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
    setProduct([]);
  }, []);
  useEffect(() => {
    fetchExampleProduct(page, search);
  }, [page, search]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`${path}?page=${1}&search=${searchInput.current.value}`);
  };
  return (
    <div className="p-5 ">
      {/* search */}
      <div className="sticky top-2 z-[2000] flex justify-center items-center w-full space-x-20 ">
        <div className=" rounded-lg overflow-hidden border bg-white border-primary text-xl py-2 px-3 md:w-[400px] w-full flex bg-primary-500 items-center text-secondary-primary">
          <form className=" grow" onSubmit={handleSearch}>
            <input
              id="search"
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
          onClick={() => navigate("/product/example/add")}
        >
          เพิ่มสินค้า
        </button>
      </div>
      {/* List */}
      <div className="grid grid-cols-4 mt-5 gap-y-8">
        {" "}
        {product.map((item, index) => (
          <div
            key={item?.Id}
            className="p-3 mx-auto rounded-md cursor-pointer hover:shadow-md"
            onClick={() => navigate(`/product/example/${item?.Product_ID}`)}
          >
            <Card
              data={item}
              img={item?.Front_Thumbnail}
              Maintext={item?.Title}
              Subtext1={item?.Supplier?.Name}
              Subtext2={item?.product_category?.Product_Category_Name}
              Price={item?.Price}
            />
          </div>
        ))}
      </div>
      <Pagination
        page={page}
        pageAll={pageAll}
        pathname={`${path}?search=${search}&`}
      />
    </div>
  );
};

export default Example;
