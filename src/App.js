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
  AddDesign,
  AddEvent,
  AddExampleProduct,
  AddFabric,
  AddKhwantaProduct,
  AddPattern,
  AddWeaving,
  Customer,
  Dashboard,
  Design,
  EditDesign,
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
  Stock,
  Store,
} from "./page";
import { useAppState } from "./zustand/appState";
import { notify, notifySuccess } from "./function/notification";
import useModalControlState from "./zustand/modalControlState";
import {
  ChangeProductClothPrice,
  DeleteProductDetailImage,
  DeleteDesignDetailImage,
  FabricPattern,
  FabricWeaving,
} from "./components/modal";

function App() {
  const isLoad = useAppState((state) => state.isLoad);
  // const scrollToTop = useAppState((state) => state.scrollToTop);

  const deleteDesignDetailImage = useModalControlState(
    (state) => state.deleteDesignDetailImage
  );
  const ChangeProductClothPriceModal = useModalControlState(
    (state) => state.ChangeProductClothPriceModal
  );
  const DeleteProductDetailImageModal = useModalControlState(
    (state) => state.DeleteProductDetailImageModal
  );
  const FabricPatternModal = useModalControlState(
    (state) => state.FabricPatternModal
  );
  const FabricWeavingModal = useModalControlState(
    (state) => state.FabricWeavingModal
  );
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
        {deleteDesignDetailImage && <DeleteDesignDetailImage />}
        {ChangeProductClothPriceModal && <ChangeProductClothPrice />}
        {DeleteProductDetailImageModal && <DeleteProductDetailImage />}
        {FabricPatternModal && <FabricPattern />}
        {FabricWeavingModal && <FabricWeaving />}
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
              <Route path="/design/add" element={<AddDesign />} />
              <Route path="/design/:id" element={<SingleDesign />} />
              <Route path="/design/edit/:id" element={<EditDesign />} />
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
              <Route path="fabric/add" element={<AddFabric />} />
              <Route path="fabric/addpattern" element={<AddPattern />} />
              <Route path="fabric/addweaving" element={<AddWeaving />} />

              <Route path="order" element={<Order />} />
              <Route path="shop" element={<Store />} />
              <Route path="shop/addEvent" element={<AddEvent />} />

              <Route path="stock" element={<Stock />} />
              <Route path="customer" element={<Customer />} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
