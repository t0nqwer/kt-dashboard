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
    " relative text-secondary-cream bg-primary pl-3 flex py-3 space-x-5 text-xl items-center rounded-lg font-medium tracking-widest";
  const normalLink =
    "relative text-primary flex py-3  pl-3 space-x-5 text-xl items-center rounded-lg font-medium tracking-widest hover:bg-primary hover:text-secondary-cream";

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
        <ul className="flex flex-col justify-center py-5 space-y-2 px-7 grow">
          {newlinks.map((link, index) => {
            // if (!user.priority && link.priority !== 0) return;
            if (link.priority < user?.priority) return;
            if (!link.subMenu) {
              return (
                <li
                  // to={link.pathname}
                  key={index}
                  className={
                    pathname === `${link.pathname}`
                      ? liactiveLink
                      : linormalLink
                    // linormalLink
                    // "relative group px-3 py-2"
                  }
                >
                  <NavLink
                    to={link.pathname}
                    className="flex items-center w-full"
                  >
                    {link.icon}
                    <span className="px-4 py-6 text-sm font-bold capitalize lg:p-6 lg:text-base">
                      {link.title}
                    </span>
                  </NavLink>
                </li>
              );
            }
            return (
              <li
                // to={link.pathname}
                key={index}
                className={
                  pathname === `${link.pathname}` ? liactiveLink : linormalLink
                  // linormalLink
                  // "relative group px-3 py-2"
                }
              >
                {link.icon}
                <span className="px-4 py-6 ml-0 text-sm font-bold capitalize lg:p-6 lg:text-base">
                  {link.title}
                </span>
                <div class=" absolute top-0 left-[180px] bg-white  transition group-hover:translate-x-5 translate-x-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-h-[72px] min-w-[150px]  w-full transform shadow-lg">
                  <div class="w-10 h-10 bg-white transform rotate-45 absolute top-0 z-0 translate-x-0 transition-transform group-hover:translate-y-2 duration-500 ease-in-out rounded-sm"></div>
                  <div class="relative z-10 text-primary px-5 text-base py-3 text-center">
                    <div>
                      {link?.subMenu?.map((sublink, index) => {
                        return (
                          <NavLink
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
                            // onMouseOut={(e) => {
                            //   e.target.style.backgroundColor = `rgba(161 ,0 ,14,${
                            //     (index + 1) / 10
                            //   }`;
                            // }}
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
