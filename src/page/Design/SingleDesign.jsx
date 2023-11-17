import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDesignStore from "../../zustand/designState";
import { useAppState } from "../../zustand/appState";
import { Sizetable } from "../../components";
import { BiEditAlt, BiPlus } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import useModalControlState from "../../zustand/modalControlState";
import useUserState from "../../zustand/userState";

const SingleDesign = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [Sizedata, setSizedata] = useState([]);
  const [SizeList, setSizeList] = useState([]);
  const [deleteImage, setDeleteImage] = useState("");
  const deleteDetailImage = useDesignStore((state) => state.deleteDetailImage);

  const user = useUserState((state) => state.user);
  const loading = useDesignStore((state) => state.loading);
  const setLoad = useAppState((state) => state.setLoad);
  const fetchSingleDesign = useDesignStore((state) => state.fetchSingleDesign);
  const addDetailImage = useDesignStore((state) => state.addDetailImage);
  const singledata = useDesignStore((state) => state.singledata);
  const setDetailImage = useDesignStore((state) => state.setDetailImage);
  const deleteDesign = useDesignStore((state) => state.deleteDesign);
  const setDeleteDesignDetailImage = useModalControlState(
    (state) => state.setDeleteDesignDetailImage
  );
  useEffect(() => {
    fetchSingleDesign(id);
  }, [id]);
  useEffect(() => {
    console.log(singledata);
    const arr = [""];
    setSizeList(arr.concat(singledata?.size.map((e) => e.size)));
    setSizedata(singledata?.size[0]?.details.map((e) => e.detail));
  }, [singledata]);
  useEffect(() => {
    setLoad(loading);
  }, [loading]);
  const addimage = (e) => {
    addDetailImage(e.target.files[0], singledata?.design.code);
  };
  const submitdata = () => {
    navigate("/design");
  };
  return (
    <div className="px-10 pb-10 ">
      {singledata && (
        <div className="flex">
          <div>
            <div className="w-[315px] h-[420px] relative rounded overflow-hidden">
              <img
                src={singledata?.design?.FrontImage}
                className="absolute object-cover w-full h-full "
                alt=""
              />
            </div>
            <div className="w-[315px] h-[420px] relative rounded overflow-hidden mt-3">
              <img
                src={singledata?.design.BackImage}
                className="absolute object-cover w-full h-full "
                alt=""
              />
            </div>
          </div>
          <div className="w-full px-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {singledata?.design.code}
                </h1>
                <p className="text-xl text-gray-600">
                  {singledata?.design.name}
                </p>
              </div>
              <div
                className="p-2 rounded hover:bg-secondary-red text-primary hover:text-secondary-light"
                onClick={() => navigate(`/design/edit/${id}`)}
              >
                <BiEditAlt className="text-3xl cursor-pointer " />
              </div>
            </div>
            <div className="grid w-full grid-cols-3 mt-5 border-t border-primary">
              <div className="flex items-baseline justify-start mt-5 space-x-4 ">
                <p className="text-lg text-gray-600">ประเภท</p>
                <h1 className="text-xl font-bold text-gray-800">
                  {singledata?.design.category}
                </h1>
              </div>
              <div className="flex items-baseline justify-start mt-5 space-x-4">
                <p className="text-lg text-gray-600">ช่างแพทเทิร์น</p>
                <h1 className="text-xl font-bold text-gray-800">
                  {singledata?.design.pattern}
                </h1>
              </div>
              <div className="flex items-baseline justify-start mt-5 space-x-4 ">
                <p className="text-lg text-gray-600">แบรนด์</p>
                <h1 className="text-xl font-bold text-gray-800">
                  {singledata?.design.brand}
                </h1>
              </div>
            </div>
            <div className="mt-5 border-t border-primary">
              <Sizetable
                data={singledata}
                SizeList={SizeList}
                Sizedata={Sizedata}
                font={"text-xl"}
                fontsmall={"text-lg"}
              />
            </div>
            <div className="mt-5 border-t border-primary">
              <div className="mt-5 text-xl"> ผ้า </div>
              <div className="mt-4">
                {/* {singledata?.product.map((item) => (
                  <span
                    key={item.product_id}
                    className="px-3 py-2 mr-4 border rounded-md cursor-pointer hover:bg-primary border-primary hover:text-secondary-cream"
                    onClick={() =>
                      navigate(`/product/cloth/${item.product_id}`)
                    }
                  >{`ผ้า${item.fabric.Type.name}${
                    item.fabric.Weaving.weaving_name
                  }${
                    item.fabric.Color.FabricColorTechnique_name === "เคมี"
                      ? ""
                      : `ย้อมสี${item.fabric.Color.FabricColorTechnique_name}`
                  }${
                    item.fabric?.Pattern?.FabricPatternName
                      ? `${item.fabric.Pattern.FabricPatternName}`
                      : ""
                  }`}</span>
                ))} */}
              </div>
            </div>
            <div className="border-t mt-7 border-primary">
              <div className="flex items-center justify-between">
                <h1 className="mt-5 text-xl"> รูปราลละเอียด</h1>
                <label className="p-2 mt-5 rounded hover:bg-secondary-red text-primary hover:text-secondary-light">
                  <input type="file" hidden onChange={addimage} />
                  <BiPlus className="text-3xl cursor-pointer " />
                </label>
              </div>
              <div className="w-full h-[300px] mt-3 overflow-y-scroll bg-secondary-cream flex flex-wrap ">
                {singledata.design.DetailImage.map((item) => (
                  <div key={item} className="relative w-[210px] h-[280px] p-3">
                    <div
                      className="absolute p-1 text-xs text-red-800 rounded-full top-5 right-5 outline outline-primary outline-1 hover:text-white hover:bg-primary hover:scale-125 "
                      onClick={() => {
                        setDetailImage(item);
                        setDeleteDesignDetailImage(true);
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                    <img
                      src={item}
                      className="object-cover w-full h-full"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 border-t border-primary">
              <div className="flex justify-end w-full mt-5 space-x-5 ">
                <button
                  id="submit"
                  className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
                  onClick={submitdata}
                >
                  Back
                </button>
                {user?.priority >= 1 && (
                  <button
                    id="submit"
                    className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
                    onClick={() => deleteDesign(singledata.design.code)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleDesign;
