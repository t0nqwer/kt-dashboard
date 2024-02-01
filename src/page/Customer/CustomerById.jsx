import React, { useEffect } from "react";
import avatar from "../../assets/avatar.svg";
import { useParams } from "react-router-dom";
import useCustomerStore from "../../zustand/customerState";

const CustomerById = () => {
  const { id } = useParams();
  const { fetchCustomerById, customer } = useCustomerStore();

  useEffect(() => {
    fetchCustomerById(id);
  }, []);

  // useEffect(() => {
  //   console.log(customer);
  // }, [customer]);

  return (
    <div className=" maindiv">
      <div className="flex justify-between space-x-10">
        {/* Profile */}
        <div className="p-5 bg-opacity-20 h-[800px] w-80 bg-secondary-gray rounded-2xl">
          <div className="flex flex-col items-center h-full space-y-2">
            <img
              className="w-full rounded-3xl"
              src={avatar}
              alt="user-profile"
            />
            {customer && (
              <h1 className="mt-2 text-2xl font-semibold text-center text-primary">
                {customer?.firstName} {customer?.lastName}
              </h1>
            )}
            {customer && (
              <p className="w-full text-primary">
                รหัสลูกค้า : {customer?.CustomerId}
              </p>
            )}
            {customer?.EngfirstName && (
              <p className="w-full text-primary">
                ชื่อภาษาอังกฤษ : {customer?.EngfirstName}{" "}
                {customer?.EnglastName}
              </p>
            )}
            {customer?.email && (
              <p className="w-full text-primary">email : {customer?.email}</p>
            )}
            {customer?.phone && (
              <p className="w-full text-primary">phone : {customer?.phone}</p>
            )}
            {customer?.address && (
              <p className="w-full break-words text-primary ">
                ที่อยู่ : {customer?.address}
              </p>
            )}
            {customer?.InstagramProfile && (
              <p className="w-full text-primary">
                Instragram : {customer?.InstagramProfile}
              </p>
            )}
            {customer?.LineId && (
              <p className="w-full text-primary">Line : {customer?.LineId}</p>
            )}
            {customer?.InstagramProfile && (
              <p className="w-full text-primary">
                Instragram : {customer?.InstagramProfile}
              </p>
            )}
          </div>
        </div>
        {/* Bill */}
        <div className="flex flex-col w-full ">
          <h1 className="text-3xl text-center text-primary">Order</h1>
          <div className="mt-4 ">
            <table className="w-full text-center ">
              <thead className="w-full text-white bg-primary">
                <tr>
                  <th className="py-2">รหัสบิล</th>
                  <th className="py-2">วันที่</th>
                  <th className="py-2">จำนวนเงิน</th>
                  <th className="py-2">สถานะ</th>
                  <th className="py-2">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">1</td>
                  <td className="py-2">1/1/2021</td>
                  <td className="py-2">100</td>
                  <td className="py-2">ยังไม่ชำระ</td>
                  <td className="py-2">
                    <button className="px-2 py-1 text-white rounded-md bg-primary hover:bg-opacity-80">
                      ดูข้อมูล
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">1</td>
                  <td className="py-2">1/1/2021</td>
                  <td className="py-2">100</td>
                  <td className="py-2">ยังไม่ชำระ</td>
                  <td className="py-2">
                    <button className="px-2 py-1 text-white rounded-md bg-primary hover:bg-opacity-80">
                      ดูข้อมูล
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Order */}
      </div>
    </div>
  );
};

export default CustomerById;
