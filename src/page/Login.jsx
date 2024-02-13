import React, { useState, useEffect } from "react";
import useUserState from "../zustand/userState";
import { useAppState } from "../zustand/appState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const isLoad = useAppState((state) => state.isLoad);
  const setLoad = useAppState((state) => state.setLoad);
  const [focus2, setFocus2] = useState(false);
  const [focus, setFocus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useUserState((state) => state.user);
  const login = useUserState((state) => state.Login);
  const loading = useUserState((state) => state.loading);
  const handleClick = (e) => {
    e.preventDefault();
    login(username, password);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  return (
    <div className="p-5 bg-secondary-light  h-screen absolute left-0 top-0 z-[1000] w-full text-black ">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-10 m-auto border rounded-md shadow-md border-primary max-md:border-none bg-secondary-light lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-primary">
            เข้าสู่ระบบ
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label className="block text-sm font-semibold text-secondary-600">
                Username
              </label>
              <input
                className="block w-full px-4 py-2 mt-2 border-[1px] rounded-md input bg-primary-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-primary border-primary shadow-md"
                onFocus={() => setFocus("focus", true)}
                onBlur={() => setFocus(false)}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-secondary-600 "
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 border-[1px] rounded-md input bg-primary-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-primary border-primary shadow-md"
                onFocus={() => setFocus2("focus", true)}
                onBlur={() => setFocus2(false)}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-primary hover:bg-opacity-80"
                onClick={handleClick}
                disabled={isLoad}
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
