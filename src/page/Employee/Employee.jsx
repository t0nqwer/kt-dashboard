import { useEffect, useState } from "react";
import useEmployeeContext from "../../zustand/employeeState";
import { notify, notifySuccess } from "../../function/notification";

const Employee = () => {
  const [data, setData] = useState({
    frist_thai: "",
    frist_eng: "",
    last_thai: "",
    last_eng: "",
    birthday: "",
  });
  const employeeList = useEmployeeContext((state) => state.employeeList);
  const setRes = useEmployeeContext((state) => state.setRes);
  const addEmployee = useEmployeeContext((state) => state.addEmployee);
  const res = useEmployeeContext((state) => state.res);
  const lableClassName = "w-52 text-right";
  const divclass = "flex w-1/2  py-3 items-center space-x-4 text-lg";
  const inputClass =
    "grow p-2  focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-primary border-primary shadow-md rounded-md";
  useEffect(() => {
    if (res === "Successfully created") {
      notifySuccess(res);
      setData({
        frist_thai: "",
        frist_eng: "",
        last_thai: "",
        last_eng: "",
        birthday: "",
      });
      setRes("");
    }
  }, [res]);
  const submitdata = () => {
    const date = new Date();
    const now = `${date.getFullYear()}-${
      (date.getMonth() + 1).toString().length === 1
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }-${date.getDate()}T${
      date.getHours().toString().length === 1
        ? `0${date.getHours()}`
        : `${date.getHours()}`
    }:${
      date.getMinutes().toString().length === 1
        ? `0${date.getMinutes()}`
        : `${date.getMinutes()}`
    }:${
      date.getSeconds().toString().length === 1
        ? `0${date.getSeconds()}`
        : `${date.getSeconds()}.000z`
    }`;
    console.log(now);
    addEmployee({ ...data, created_at: now });
  };
  return (
    <div className="px-8">
      <h1 className="text-3xl text-primary font-Tenor ">Employee</h1>
      <div className="flex flex-wrap w-full">
        <div className={divclass}>
          <p className={lableClassName}> ชื่อจริง (ภาษาไทย) : </p>
          <input
            className={inputClass}
            type="text"
            name="name"
            value={data.frist_thai}
            onChange={(e) =>
              setData((prev) => ({ ...prev, frist_thai: e.target.value }))
            }
          />
        </div>
        <div className={divclass}>
          <p className={lableClassName}> นามสกุล (ภาษาไทย) : </p>
          <input
            className={inputClass}
            type="text"
            name="lastname"
            value={data.last_thai}
            onChange={(e) =>
              setData((prev) => ({ ...prev, last_thai: e.target.value }))
            }
          />
        </div>

        <div className={divclass}>
          <p className={lableClassName}> ชื่อจริง (ภาษาอังกฤษ) : </p>
          <input
            className={inputClass}
            type="text"
            name="name"
            value={data.frist_eng}
            onChange={(e) =>
              setData((prev) => ({ ...prev, frist_eng: e.target.value }))
            }
          />
        </div>
        <div className={divclass}>
          <p className={lableClassName}> นามสกุล (ภาษาอังกฤษ) : </p>
          <input
            className={inputClass}
            type="text"
            name="lastname"
            value={data.last_eng}
            onChange={(e) =>
              setData((prev) => ({ ...prev, last_eng: e.target.value }))
            }
          />
        </div>
        <div className={divclass}>
          <p className={lableClassName}> วันเกิด : </p>
          <input
            className={inputClass}
            type="date"
            name="name"
            value={data.birthday}
            onChange={(e) =>
              setData((prev) => ({ ...prev, birthday: e.target.value }))
            }
          />
        </div>
        <div className="flex items-center justify-end w-1/2 ">
          <button
            className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 "
            onClick={submitdata}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default Employee;
