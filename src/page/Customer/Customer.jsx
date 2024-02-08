import React, { useEffect } from "react";
import useCustomerStore from "../../zustand/customerState";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const { customers, fetchCustomers } = useCustomerStore();

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div className="maindiv">
      {/* Headline */}
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">Customer</h1>
        <button
          id="createBill"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={() => {
            navigate("/sale/customer/create");
          }}
        >
          เพิ่มลูกค้า
        </button>
      </div>
      {/* Table */
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-center table-auto">
          <thead className="text-white bg-primary">
            <tr>
              <th className="py-2">รหัสลูกค้า</th>
              <th className="py-2">ชื่อลูกค้า</th>
              <th className="py-2">เบอร์โทร</th>
              <th className="py-2">ที่อยู่</th>
              <th className="py-2">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer._id}>
                <td className="py-2">{customer.CustomerId}</td>
                <td className="py-2">{`${customer.firstName}  ${customer.lastName}`}</td>
                <td className="py-2">{customer.phone}</td>
                <td className="py-2">{customer.address}</td>
                <td className="py-2">
                  <button
                    className="px-2 py-1 text-white rounded-md bg-primary hover:bg-opacity-80"
                    onClick={() => {
                      navigate(`/sale/customer/${customer._id}`);
                    }}
                  >
                    ดูข้อมูล
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button className="px-2 py-1 mx-2 text-white rounded-md bg-primary hover:bg-opacity-80">
          ก่อนหน้า
        </button>
        <button className="px-2 py-1 mx-2 text-white rounded-md bg-primary hover:bg-opacity-80">
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default Customer;
