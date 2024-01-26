import React, { useEffect, useState } from "react";
import useCustomerStore from "../../zustand/customerState";
import { useAppState } from "../../zustand/appState";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { customers, fetchCustomers, loading, res, createCustomer } =
    useCustomerStore();
  const setLoad = useAppState((state) => state.setLoad);
  const [data, setData] = useState({
    thaifirstname: "",
    thailastname: "",
    engfirstname: "",
    englastname: "",
    gender: "",
    birthday: "",
    detail: "",
    phone: "",
    address: "",
    email: "",
    lineid: "",
    facebook: "",
    instagram: "",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  useEffect(() => {
    if (res === "success") {
      useCustomerStore.setState({
        loading: false,
        customer: {},
        customers: [],
        res: "",
      });
      navigate("/sale/customer");
    }
  }, [res]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createCustomer(data);
  };

  return (
    <div className="maindiv">
      <div className="flex justify-between">
        <h1 className="text-3xl text-primary">เพิ่มลูกค้า</h1>
      </div>
      <form className="mt-5 " onSubmit={handleSubmit}>
        <div className="w-full px-3 pb-2 mb-3 text-xl text-gray-400 border-b border-gray-400">
          <span>ข้อมูลส่วนตัว</span>
        </div>

        <div className="flex flex-wrap w-full">
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">ชื่อจริง (ภาษาไทย) :</label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="ชื่อจริง (ภาษาไทย)"
              name="thaifirstname"
              onChange={(e) =>
                setData({ ...data, thaifirstname: e.target.value })
              }
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">นามสกุล (ภาษาไทย) :</label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none"
              type="text"
              placeholder="นามสกุล (ภาษาไทย)"
              name="thailastname"
              onChange={(e) =>
                setData({ ...data, thailastname: e.target.value })
              }
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">ชื่อจริง (ภาษาอังกฤษ) :</label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="ชื่อจริง (ภาษาอังกฤษ)"
              name="engfirstname"
              onChange={(e) =>
                setData({ ...data, engfirstname: e.target.value })
              }
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">นามสกุล (ภาษาอังกฤษ) :</label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none"
              type="text"
              placeholder="นามสกุล (ภาษาอังกฤษ)"
              name="englastname"
              onChange={(e) =>
                setData({ ...data, englastname: e.target.value })
              }
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">เพศ :</label>
            <select
              className="twoBlockFormInput"
              onChange={(e) => setData({ ...data, gender: e.target.value })}
            >
              <option value=""></option>
              <option value="male">ชาย</option>
              <option value="female">หญิง</option>
            </select>
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">วันเกิด :</label>
            <input
              className="twoBlockFormInput"
              type="date"
              placeholder="วันเกิด"
              name="birthday"
              onChange={(e) => setData({ ...data, birthday: e.target.value })}
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">ข้อมูลเพิ่มเติม</label>
            <textarea
              className="twoBlockFormInput"
              placeholder="ข้อมูลเพิ่มเติม"
              name="detail"
              onChange={(e) => setData({ ...data, detail: e.target.value })}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-wrap w-full">
          <div className="w-full px-3 pb-2 mb-3 text-xl text-gray-400 border-b border-gray-400">
            <span>ช่องทางการติดต่อ</span>
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">เบอร์โทรศัพท์ :</label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="เบอร์โทรศัพท์"
              name="phone"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">ที่อยู่ :</label>
            <textarea
              className="twoBlockFormInput"
              placeholder="ที่อยู่"
              name="address"
              onChange={(e) => setData({ ...data, address: e.target.value })}
            ></textarea>
          </div>
          <div className=" twoBlockForm">
            <label className="twoBlockFormLable">email :</label>
            <input
              className="twoBlockFormInput"
              type="email"
              placeholder="email"
              name="email"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="twoBlockForm ">
            <label className="twoBlockFormLable"> LineID</label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="LineID"
              name="lineid"
              onChange={(e) => setData({ ...data, lineid: e.target.value })}
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">Facebook</label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="Facebook"
              name="facebook"
              onChange={(e) => setData({ ...data, facebook: e.target.value })}
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">Instagram</label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="Instagram"
              name="instagram"
              onChange={(e) => setData({ ...data, instagram: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center px-3 mt-5">
          <h1 className="text-red-500 ">* กรุณาตรวจสอบข้อมูลให้ถูกต้อง</h1>

          <input
            className="px-10 py-2 text-white bg-green-500 rounded hover:bg-green-600 "
            type="submit"
            value="บันทึก"
            name="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
