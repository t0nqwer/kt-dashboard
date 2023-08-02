import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../zustand/appState";
import { AiOutlineSearch } from "react-icons/ai";
import { Cloth, Example, Khwanta, ProductNav } from "../../components";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Product = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split("/");
  const pathName = pathArray[pathArray.length - 1];
  const navigate = useNavigate();
  const qurey = useQuery();
  const page = qurey.get("page") || 1;
  const search = qurey.get("search") || "";
  const searchInput = useRef(null);

  return (
    <div>
      <ProductNav />
      {pathName === "cloth" && <Cloth />}
      {pathName === "khwanta" && <Khwanta />}
      {pathName === "example" && <Example />}
    </div>
  );
};

export default Product;
