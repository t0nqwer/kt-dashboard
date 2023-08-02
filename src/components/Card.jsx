import React from "react";
import { Thai } from "../function/currency";

const Card = ({ data, img, Maintext, Subtext1, Subtext2, Price }) => {
  return (
    <div className="">
      <div className="w-[350px] h-[466px] relative rounded-lg overflow-hidden bg-secondary-cream">
        <img src={img} className="absolute object-cover w-full h-full" alt="" />
      </div>

      <div className="relative py-3 grow">
        {Maintext && (
          <p className="text-lg w-[250px] font-medium truncate">{Maintext}</p>
        )}
        {Subtext1 && <p className="truncate ">{Subtext1}</p>}
        {Subtext2 && <p className="truncate ">{Subtext2}</p>}
        {Price && (
          <p className="absolute right-0 pt-3 font-medium top-1 w-fit ">
            {Thai.format(Price)}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
