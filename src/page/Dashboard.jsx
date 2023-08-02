import React, { useEffect } from "react";
import useUserState from "../zustand/userState";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../zustand/appState";

const Dashboard = () => {
  const navigate = useNavigate();
  const setPathname = useAppState((state) => state.setPathname);
  const user = useUserState((state) => state.user);

  useEffect(() => {
    setPathname("dashboard");
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
