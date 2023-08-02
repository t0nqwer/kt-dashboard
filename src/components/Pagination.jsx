import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ pageAll, page, pathname }) => {
  const navigate = useNavigate();
  let arrPage = [];

  const allPage = Math.ceil(pageAll);
  const pagebf = +page + 6 > allPage ? 6 - (allPage - +page) + 6 : 6;
  const pageaf = +page - 6 < 0 ? 6 - +page + 6 : 6;

  let listbf = [];
  let listaf = [];
  for (let i = 1; i <= allPage; i++) {
    const number = +page - i;

    if (number < pagebf && number >= 0) {
      arrPage.push(i);
    }
    if (Math.abs(number) <= pageaf && number < 0) {
      arrPage.push(i);
    }
  }
  const NavBF = (e) => {
    navigate(`${pathname}&page=${+page - 1}`);
  };
  const NavNX = (e) => {
    navigate(`${pathname}&page=${+page + 1}`);
  };
  return (
    <div className="px-4 py-10">
      <div className="flex justify-center w-full py-1 text-xs text-center text-primary-500">
        {page} / {Math.ceil(pageAll)}
      </div>
      <div className="flex justify-center w-full border-t ">
        <div className="flex space-x-3">
          <button
            className="flex items-center justify-center rounded-md w-9 h-9 text-primary hover:bg-secondary-red hover:text-secondary-light disabled:text-secondary-gray disabled:hover:bg-transparent "
            onClick={() => NavBF()}
            disabled={+page === 1}
          >
            <FaArrowLeft />
          </button>
          {+page > 6 && (
            <div className="px-3 py-1 text-xl font-bold text-center text-primary">
              ...
            </div>
          )}
          {arrPage.map((item, index) => {
            return (
              <div
                key={index}
                className={` w-9 h-9 flex items-center justify-center transition-colors text-lg text-center rounded-md cursor-pointer ${
                  +page === item
                    ? "text-secondary-cream bg-primary"
                    : "text-primary hover:bg-secondary-red hover:text-secondary-light"
                } `}
                onClick={() => {
                  navigate(`${pathname}page=${item}`);
                }}
              >
                {item}
              </div>
            );
          })}
          {arrPage.pop() < allPage && (
            <div className="px-3 py-1 text-xl font-bold text-center text-primary">
              ...
            </div>
          )}
          <button
            className="flex items-center justify-center rounded-md w-9 h-9 text-primary hover:bg-secondary-red hover:text-secondary-light disabled:text-secondary-gray disabled:hover:bg-transparent "
            onClick={() => NavNX()}
            disabled={+page === allPage}
          >
            <FaArrowRight />
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Pagination;
