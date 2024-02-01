import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useQuery from "../../function/useQuery.js";

const Bill = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const orderfilter = query.get("order_filter") || "";
  const [queryOrder, setQueryOrder] = useState("");

  useEffect(() => {
    navigate(`/sale/bill?order_filter=${queryOrder}`);
  }, [queryOrder]);

  const setQuery = (e) => {
    if (e.target.innerHTML === "clear") {
      setQueryOrder("");
      return;
    }
    setQueryOrder(e.target.innerHTML);
  };

  const createBill = () => {
    navigate("/sale/bill/create");
  };
  const classNonQuery =
    "px-3 py-2 font-semibold outline outline-1 hover:outline-0 outline-primary hover:bg-primary hover:text-white";
  const classQuery =
    "px-3 py-2 font-semibold bg-primary text-white outline outline-1 hover:outline-0 outline-primary hover:bg-white hover:text-primary";

  return (
    <div className=" maindiv">
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">Bill</h1>
        <button
          id="createBill"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={createBill}
        >
          สร้างบิลใหม่
        </button>
      </div>
      <ul className="flex justify-center w-full mt-10 space-x-10 text-center select-none">
        <li
          className={queryOrder === "บิลออนไลน์" ? classQuery : classNonQuery}
          onClick={setQuery}
        >
          บิลออนไลน์
        </li>
        <li
          className={queryOrder === "บิลร้านค้า" ? classQuery : classNonQuery}
          onClick={setQuery}
        >
          บิลร้านค้า
        </li>
        <li className={classNonQuery} onClick={setQuery}>
          clear
        </li>
      </ul>
      <div></div>
    </div>
  );
};

export default Bill;
