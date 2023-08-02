import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import avatar from "../assets/avatar.svg";
import useUserState from "../zustand/userState";
import { useAppState } from "../zustand/appState";
import { useNavigate } from "react-router-dom";
import { notifyPray, notifySuccess } from "../function/notification";
import UserInfo from "./userInfo";
const NavBar = () => {
  const navigate = useNavigate();
  const user = useUserState((state) => state.user);
  const setNavbar = useAppState((state) => state.setNavbar);
  const activeNavbar = useAppState((state) => state.activeNavbar);
  const [greeding, setGreeding] = useState("");
  let now = new Date();
  let isMorning = now.getHours() > 5 && now.getHours() <= 12;
  let isAfternoon = now.getHours() > 12 && now.getHours() < 18;
  useEffect(() => {
    if (isMorning) return setGreeding("อรุณสวัสดิ์");
    if (isAfternoon) return setGreeding("สวัสดียามบ่าย");
    setGreeding("สวัสดียามเย็น");
  }, []);
  useEffect(() => {
    if (user === null) navigate("/login");
    {
      greeding && user && notifyPray(` ${greeding} ${user.first_name_thai}`);
    }
  }, [user]);
  const handleClick = (e) => {
    setNavbar(e);
  };
  return (
    <div className="sticky top-0 z-50 flex justify-end w-full px-10 py-3 bg-secondary-light bg-opacity-30 backdrop-blur-md text-primary">
      <div>
        <div
          className="flex items-center gap-2 p-1 rounded-lg cursor-pointer select-none hover:bg-light-gray"
          onClick={() => setNavbar("user")}
        >
          <img
            className="w-8 h-8 rounded-full"
            src={avatar}
            alt="user-profile"
          />
          <p>
            <span className="text-primary text-14">{greeding},</span>{" "}
            <span className="ml-1 font-semibold tracking-widest text-14">
              {user && user.first_name_thai}
            </span>
          </p>
          <MdKeyboardArrowDown className=" text-14" />
        </div>
      </div>
      {activeNavbar === "user" && <UserInfo />}
    </div>
  );
};

export default NavBar;
