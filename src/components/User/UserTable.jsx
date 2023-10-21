import React from "react";
import useUserState from "../../zustand/userState";
import useEmployeeContext from "../../zustand/employeeState";

const UserTable = () => {
  const employeeList = useEmployeeContext((state) => state.employeeList);
  const loading = useEmployeeContext((state) => state.loading);
  const fetchEmployeeList = useEmployeeContext(
    (state) => state.fetchEmployeeList
  );
  React.useEffect(() => {
    fetchEmployeeList();
  }, []);

  return (
    <div className="w-full mt-10">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="text-lg font-semibold">ชื่อ-นามสกุล</th>
            <th className="text-lg font-semibold">ชื่อ-นามสกุล ภาษาอังกฤษ</th>
            <th className="text-lg font-semibold">ชื่อผู้ใช้</th>
            <th className="text-lg font-semibold">ตำแหน่ง</th>
            <th className="text-lg font-semibold">วันเกิด</th>
          </tr>
        </thead>
        <tbody>
          {employeeList?.map((e, i) => {
            return (
              <tr key={i} className="h-16 ">
                <td>{`${e?.thaifirstname} ${e?.thailastname}`}</td>
                <td>{`${e?.firstname} ${e?.lastname}`}</td>
                <td>{e?.username}</td>
                <td>{e?.role}</td>
                <td>{`${new Date(e?.birthday).toDateString()}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
