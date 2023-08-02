import React from "react";
import "./loading.css";
const Loading = () => {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen p-10 rounded-md bg-primary backdrop-blur-lg bg-opacity-50 max-md:p-0 z-[10000] ">
      <div className="absolute inline-flex items-end p-10 rounded-md max-md:hidden">
        <span className="tracking-widest align-baseline text-7xl max-lg:text-5xl font-Tenor text-primary">
          Loading
        </span>
        <span className="loader "></span>
      </div>
      <div className="flex items-center justify-center w-full h-full bg-secondary-cream">
        <div className="relative">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="absolute top-0 flex items-center justify-center w-full h-full ">
            <p className="text-3xl tracking-widest text-center align-middle font-Tenor text-primary">
              KHWANTA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
