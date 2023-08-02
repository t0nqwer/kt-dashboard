import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProductNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split("/");
  const pathName = pathArray[pathArray.length - 1];
  const classNav =
    " text-primary font-bold border-b-2 border-primary w-full text-center py-2 px-4 cursor-pointer hover:bg-secondary-red hover:text-white";
  const classNavActive =
    "text-secondary-light bg-primary font-bold border-b-2 border-primary w-full text-center py-2 px-4 cursor-pointer hover:bg-primary hover:text-white";
  return (
    <div className="flex justify-around px-10 ">
      <div
        className={pathName === "cloth" ? classNavActive : classNav}
        onClick={() => navigate("/product/cloth")}
      >
        เสื้อผ้า
      </div>
      <div
        className={pathName === "khwanta" ? classNavActive : classNav}
        onClick={() => navigate("/product/khwanta")}
      >
        อื่นๆ
      </div>
      <div
        className={pathName === "example" ? classNavActive : classNav}
        onClick={() => navigate("/product/example")}
      >
        ตัวอย่าง
      </div>
    </div>
  );
};

export default ProductNav;
