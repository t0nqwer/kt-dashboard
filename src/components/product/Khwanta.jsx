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

const Khwanta = () => {
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
  const fetchProduct = useProductStore((state) => state.fetchProduct);
  const setProduct = useProductStore((state) => state.setProduct);
  ////////////////////////////////
  ////////////////////////////////
  useEffect(() => {
    setProduct([]);
  }, []);
  useEffect(() => {
    fetchProduct(page, search);
    document.getElementById("search").value = search;
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
          onClick={() => navigate("/product/khwanta/add")}
        >
          เพิ่มสินค้า
        </button>
      </div>
      {/* List */}
      <div className="product-grid">
        {product.map((item, index) => (
          <div
            key={item?._id}
            className="p-3 mx-auto rounded-md cursor-pointer hover:shadow-md"
            onClick={() => navigate(`/product/khwanta/${item?._id}`)}
          >
            <Card
              data={item}
              img={item?.frontImage}
              Maintext={item?.name}
              Subtext1={item?.supplier}
              Subtext2={item?.category}
              Price={item?.price}
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

export default Khwanta;
