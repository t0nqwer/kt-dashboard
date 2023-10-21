import React, { useEffect } from "react";

import useFabricStore from "../../zustand/fabricState";
import { useAppState } from "../../zustand/appState";

const Fabric = () => {
  const setLoad = useAppState((state) => state.setLoad);
  const fabric = useFabricStore((state) => state.fabric);
  const fetchFabric = useFabricStore((state) => state.fetchFabric);
  const loading = useFabricStore((state) => state.loading);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  useEffect(() => {
    fetchFabric();
  }, []);
  return (
    <div className="maindiv">
      <table className="w-full">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>ชื่อ</th>
            <th>เทคนิคการทอ</th>
            <th>ลาย</th>
            <th>ผ้า</th>
            <th>เทคนิคการย้อม</th>
            <th>จำนวนสินค้า</th>
          </tr>
        </thead>
        <tbody>
          {fabric.map((e, i) => {
            return (
              <tr key={i} className="mt-1 text-center border">
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.weaving}</td>
                <td>{e.pattern}</td>
                <td>{e.type}</td>
                <td>{e.color}</td>
                <td>{e.product}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Fabric;
