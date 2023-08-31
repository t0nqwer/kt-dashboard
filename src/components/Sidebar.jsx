import React, { useEffect } from "react";
import Logo from "../assets/Logo";
import { links, newlinks } from "../assets/sidebar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../zustand/appState";
import useUserState from "../zustand/userState";
const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split("/");
  const pathName = pathArray[1];
  const activeSidebar = useAppState((state) => state.activeSidebar);
  const toggleSidebar = useAppState((state) => state.toggleSidebar);
  const pathname = useAppState((state) => state.pathname);
  const setPathname = useAppState((state) => state.setPathname);
  const user = useUserState((state) => state.user);

  useEffect(() => {
    setPathname(pathName);
  }, [path]);
  const activeLink =
    "text-secondary-cream bg-primary pl-3 flex py-3 space-x-5 text-xl items-center rounded-lg font-medium tracking-widest";
  const normalLink =
    "text-primary flex py-3  pl-3 space-x-5 text-xl items-center rounded-lg font-medium tracking-widest hover:bg-primary hover:text-secondary-cream";
  return (
    <div className="h-screen shadow-md select-none w-72 bg-secondary-cream shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-5">
          <Logo fill={"#A1000E"} />
        </div>
        <div className="flex flex-col justify-center py-5 space-y-8 px-7 grow">
          {newlinks.map((link, index) => {
            if (link.priority < user?.role?.priority) return;
            return (
              <NavLink
                to={link.pathname}
                key={index}
                className={
                  pathname === `${link.pathname}` ? activeLink : normalLink
                }
              >
                {link.icon}
                <span className="capitalize ">{link.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
