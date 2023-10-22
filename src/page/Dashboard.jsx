import React, { useEffect } from "react";
import useUserState from "../zustand/userState";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../zustand/appState";
import FirstSection from "../components/dashboard/FirstSection";

const Dashboard = () => {
  const navigate = useNavigate();
  const setPathname = useAppState((state) => state.setPathname);
  const user = useUserState((state) => state.user);

  useEffect(() => {
    setPathname("dashboard");
  }, []);
  return (
    <div className="maindiv">
      <FirstSection />
    </div>
  );
};

export default Dashboard;
