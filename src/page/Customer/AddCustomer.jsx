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
    image: "",
  });
  const [alertDuplicateName, setAlertDuplicateName] = useState(false);
  const [alertDuplicateNameEng, setAlertDuplicateNameEng] = useState(false);
  const [alertDuplicatePhone, setAlertDuplicatePhone] = useState(false);
  const [alertDuplicateEmail, setAlertDuplicateEmail] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

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

  useEffect(() => {
    const checkThaiName = customers.filter(
      (customer) =>
        customer.firstName === data.thaifirstname &&
        customer.lastName === data.thailastname
    );
    const checkEngName = customers.filter(
      (customer) =>
        customer.EngfirstName === data.engfirstname &&
        customer.EnglastName === data.englastname
    );
    const checkPhone = customers.filter(
      (customer) => customer.phone === data.phone
    );
    const checkEmail = customers.filter(
      (customer) => customer.email === data.email
    );
    if (checkThaiName.length > 0) {
      setAlertDuplicateName(true);
    } else {
      setAlertDuplicateName(false);
    }
    if (checkEngName.length > 0) {
      setAlertDuplicateNameEng(true);
    } else {
      setAlertDuplicateNameEng(false);
    }
    if (checkPhone.length > 0) {
      setAlertDuplicatePhone(true);
    } else {
      setAlertDuplicatePhone(false);
    }
    if (checkEmail.length > 0) {
      setAlertDuplicateEmail(true);
    } else {
      setAlertDuplicateEmail(false);
    }
  }, [data]);
  useEffect(() => {
    if (
      alertDuplicateName ||
      alertDuplicateNameEng ||
      alertDuplicatePhone ||
      alertDuplicateEmail
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
    console.log(
      alertDuplicateName,
      alertDuplicateNameEng,
      alertDuplicatePhone,
      alertDuplicateEmail
    );
  }, [
    alertDuplicateName,
    alertDuplicateNameEng,
    alertDuplicatePhone,
    alertDuplicateEmail,
  ]);
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
          <span>ข้อมูลส่วนตัว</span>{" "}
        </div>
        <div className="flex flex-wrap w-full">
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">
              ชื่อจริง (ภาษาไทย)
              {alertDuplicateName && (
                <span className="text-red-500"> ชื่อนี้มีในระบบแล้ว</span>
              )}
            </label>
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
            <label className="twoBlockFormLable">นามสกุล (ภาษาไทย)</label>
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
            <label className="twoBlockFormLable">
              ชื่อจริง (ภาษาอังกฤษ)
              {alertDuplicateNameEng && (
                <span className="text-red-500"> ชื่อนี้มีในระบบแล้ว</span>
              )}
            </label>
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
            <label className="twoBlockFormLable">นามสกุล (ภาษาอังกฤษ) </label>
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
              className="h-40 twoBlockFormInput"
              placeholder="ข้อมูลเพิ่มเติม"
              name="detail"
              onChange={(e) => setData({ ...data, detail: e.target.value })}
            ></textarea>
          </div>
          {/* <div className=" twoBlockForm">
            <div className="twoBlockFormLable">รูปภาพ</div>
            <input
              className="twoBlockFormInput"
              type="file"
              placeholder="รูปภาพ"
              name="image"
              onChange={(e) => setData({ ...data, image: e.target.value })}
            />
          </div> */}
        </div>
        <div className="flex flex-wrap w-full">
          <div className="w-full px-3 pb-2 mb-3 text-xl text-gray-400 border-b border-gray-400">
            <span>ช่องทางการติดต่อ</span>
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">
              เบอร์โทรศัพท์
              {alertDuplicatePhone && (
                <span className="text-red-500 "> เบอร์นี้มีในระบบแล้ว</span>
              )}
            </label>
            <input
              className="twoBlockFormInput"
              type="text"
              placeholder="เบอร์โทรศัพท์"
              name="phone"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="twoBlockForm">
            <label className="twoBlockFormLable">ที่อยู่</label>
            <textarea
              className="twoBlockFormInput"
              placeholder="ที่อยู่"
              name="address"
              onChange={(e) => setData({ ...data, address: e.target.value })}
            ></textarea>
          </div>
          <div className=" twoBlockForm">
            <label className="twoBlockFormLable">
              email
              {alertDuplicateEmail && (
                <span className="text-red-500"> อีเมล์นี้มีในระบบแล้ว</span>
              )}
            </label>
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
            className="px-10 py-2 text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-secondary-gray "
            type="submit"
            value="บันทึก"
            name="submit"
            disabled={buttonDisabled}
          />
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
