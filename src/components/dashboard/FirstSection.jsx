import React, { useEffect } from "react";
import { useAppState } from "../../zustand/appState";
import useDashboardState from "../../zustand/dashboardState";

export const Card = ({ item, name }) => {
  return (
    <div className="flex flex-col items-center justify-center w-40 h-20 text-center rounded-md bg-primary ">
      <h1 className="text-4xl font-semibold text-secondary-light">{item}</h1>
      <h1 className=" text-secondary-light">{name}</h1>
    </div>
  );
};

const FirstSection = () => {
  const firstSection = useDashboardState((state) => state.firstSection);
  const fetchFirstSection = useDashboardState(
    (state) => state.fetchFirstSection
  );
  useEffect(() => {
    fetchFirstSection("firstSection");
  }, []);
  return (
    <div className="flex justify-around mt-10">
      <Card item={firstSection.design} name={`แบบเสื้อผ้า`} />
      <Card item={firstSection.product} name={`รหัสสินค้า`} />
      <Card item={firstSection.store} name={`ร้านค้าที่เปิด`} />
      <Card item={`0`} name={`สินค้าในสต๊อค`} />
    </div>
  );
};

export default FirstSection;
