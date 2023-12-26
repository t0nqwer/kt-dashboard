import React, { useEffect } from "react";
import Logo from "../assets/Logo";
import { newlinks } from "../assets/sidebar";
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
  const checkTokenStatus = useUserState((state) => state.checkTokenStatus);

  useEffect(() => {
    checkTokenStatus();
    setPathname(pathName);
  }, [path]);

  const linormalLink =
    "relative group flex  pl-3  text-xl items-center rounded-lg font-medium tracking-widest hover:bg-primary hover:text-secondary-cream";
  const liactiveLink =
    " relative group text-secondary-cream bg-primary pl-3 flex  text-xl items-center rounded-lg font-medium tracking-widest";
  return (
    <div className="h-screen shadow-md select-none w-72 bg-secondary-cream shrink-0">
      <div className="flex flex-col h-full">
        <div className="p-5">
          <Logo fill={"#A1000E"} />
        </div>
        <ul className="flex flex-col justify-center py-2 space-y-2 px-7 grow">
          {newlinks.map((link, index) => {
            if (link.priority > user?.priority) return;
            if (!link.subMenu) {
              return (
                <li
                  key={index}
                  className={
                    pathname === `${link.pathname}`
                      ? liactiveLink
                      : linormalLink
                  }
                >
                  <NavLink
                    to={link.pathname}
                    className="flex items-center w-full"
                  >
                    {link.icon}
                    <span className="px-4 py-6 text-sm font-bold capitalize lg:p-4 lg:text-base">
                      {link.title}
                    </span>
                  </NavLink>
                </li>
              );
            }
            return (
              <li
                key={index}
                className={
                  pathname === `${link.pathname}` ? liactiveLink : linormalLink
                }
              >
                {link.icon}
                <span className="px-4 py-2 ml-0 text-sm font-bold capitalize lg:p-4 lg:text-base">
                  {link.title}
                </span>
                <div className=" absolute top-0 left-[180px] bg-white  transition group-hover:translate-x-5 translate-x-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-h-[56px] min-w-[150px]  w-full transform shadow-lg">
                  <div className="absolute top-0 z-0 w-10 h-10 transition-transform duration-500 ease-in-out transform rotate-45 translate-x-0 bg-white rounded-sm group-hover:translate-y-2"></div>
                  <div className="relative z-10 px-5 py-3 text-base text-center text-primary">
                    <div>
                      {link?.subMenu?.map((sublink, index) => {
                        return (
                          <NavLink
                            key={sublink.title}
                            to={sublink.pathname}
                            className={`flex items-center justify-center py-1 mt-2 bg-primary  `}
                            style={{
                              backgroundColor: `rgba(161 ,0 ,14,${
                                (index + 1) / 10
                              }`,
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = `rgba(255 ,255 ,255`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = `rgba(161 ,0 ,14,${
                                (index + 1) / 10
                              }`;
                            }}
                          >
                            {sublink.icon}
                            <p className="ml-2">{sublink.title}</p>
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
