import React, { useEffect } from "react";
import "./App.css";
import Logo from "./assets/Logo";
import { Loading, Navbar, Sidebar } from "./components";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  redirect,
} from "react-router-dom";
import { ToastContainer, Flip } from "react-toastify";
import {
  AddClothProduct,
  AddExampleProduct,
  AddKhwantaProduct,
  Dashboard,
  Design,
  Employee,
  Event,
  Fabrics,
  Login,
  Order,
  Product,
  SingleCloth,
  SingleDesign,
  SingleExample,
  SingleProduct,
} from "./page";
import { useAppState } from "./zustand/appState";
import { notify, notifySuccess } from "./function/notification";

function App() {
  const isLoad = useAppState((state) => state.isLoad);
  // const scrollToTop = useAppState((state) => state.scrollToTop);

  useEffect(() => {
    document
      .getElementById("main")
      .scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [isLoad]);

  return (
    <BrowserRouter>
      <div className="relative w-screen overflow-hidden">
        {isLoad && <Loading />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          transition={Flip}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="flex w-full overflow-hidden">
          <Sidebar />
          <div
            id="main"
            className="w-full h-screen overflow-x-hidden overflow-y-scroll bg-secondary-light"
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to={"/dashboard"} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/design" element={<Design />} />
              <Route path="/design/:id" element={<SingleDesign />} />
              <Route path="/employee" element={<Employee />} />
              <Route
                path="/product"
                element={<Navigate to={"/product/cloth"} />}
              />
              <Route path="/product/cloth" element={<Product />} />
              <Route path="/product/khwanta" element={<Product />} />
              <Route path="/product/example" element={<Product />} />
              <Route path="/product/cloth/add" element={<AddClothProduct />} />
              <Route
                path="/product/khwanta/add"
                element={<AddKhwantaProduct />}
              />
              <Route
                path="/product/example/add"
                element={<AddExampleProduct />}
              />
              <Route path="/product/cloth/:id" element={<SingleCloth />} />
              <Route path="/product/khwanta/:id" element={<SingleProduct />} />
              <Route path="/product/example/:id" element={<SingleExample />} />
              <Route path="fabric" element={<Fabrics />} />
              <Route path="order" element={<Order />} />
              <Route path="event" element={<Event />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
