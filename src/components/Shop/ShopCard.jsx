import React from "react";

const ShopCard = (item) => {
  return (
    <div
      key={item.item._id}
      className={`w-full rounded-md h-60 bg-secondary-gray
      ${
        item.item.closeDate === null ||
        new Date(item.item.closeDate).getTime() > new Date().getTime()
          ? "opacity-100   outline outline-green-600 "
          : "opacity-50 outline outline-red-600 "
      }
      outline outline-green-600 
      `}
    >
      <div className="relative w-full overflow-hidden rounded h-52 bg-secondary-cream">
        <img
          className="absolute object-cover w-full h-full "
          src={item.item.image}
          alt=""
        />
      </div>
      <div className="w-full text-lg text-center text-secondary-light">
        <h2> {item.item.name}</h2>
      </div>
    </div>
  );
};

export default ShopCard;
