import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import avatar from "../assets/avatar.svg";
import useUserState from "../zustand/userState";
import { useAppState } from "../zustand/appState";
const UserInfo = () => {
  const user = useUserState((state) => state.user);
  const Logout = useUserState((state) => state.Logout);
  const setNavbar = useAppState((state) => state.setNavbar);
  const handleLogout = () => {
    setNavbar("");
    Logout();
  };
  const handleSetNavbar = () => {
    setNavbar("");
  };
  return (
    <div className="absolute p-5 rounded-lg shadow-md bg-secondary-cream nav-item right-10 top-16 w-96">
      <div className="flex items-center justify-between px-3">
        <p className="text-lg font-semibold ">ข้อมูลส่วนตัว</p>
        <button
          className="p-3 rounded-md hover:bg-primary hover:text-secondary-light"
          onClick={handleSetNavbar}
        >
          <MdOutlineCancel />
        </button>
      </div>
      <div className="flex items-center gap-5 pb-6 mt-6 border-color border-b-1">
        <img
          className="w-24 h-24 rounded-full"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="text-xl font-semibold ">
            {user?.thaifirstname} {user?.thailastname}
          </p>
          <p className="text-sm ">{user?.role}</p>
        </div>
      </div>
      <div></div>
      <div className="mt-5">
        <button
          className="w-full p-3 text-lg rounded-lg text-secondary-light hover:text-primary hover:drop-shadow-xl hover:bg-secondary-light bg-primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
