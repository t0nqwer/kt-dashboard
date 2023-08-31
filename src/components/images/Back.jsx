import React from "react";

const BackImage = ({ onSelectBackFile, BackURL }) => {
  return (
    <div className="pr-8 w-fit">
      <h1 className="mb-2 text-2xl text-secondary-500">รูปด้านหลัง</h1>
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
          <input type="file" className="hidden" onChange={onSelectBackFile} />
        </label>
      </div>
      <div className="w-64 overflow-hidden rounded-md h-96 outline-dashed outline-1">
        {BackURL === "" ? (
          ""
        ) : (
          <img src={BackURL} className="object-contain w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default BackImage;
