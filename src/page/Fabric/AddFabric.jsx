import React, { useEffect } from "react";
import useFabricStore from "../../zustand/fabricState";
import Select from "../../components/Select";
import { useAppState } from "../../zustand/appState";
import { useLocation, useNavigate } from "react-router-dom";
import useModalControlState from "../../zustand/modalControlState";

const AddFabric = () => {
  const navigate = useNavigate();

  const setFabricPatternModal = useModalControlState(
    (state) => state.setFabricPatternModal
  );
  const setFabricWeavingModal = useModalControlState(
    (state) => state.setFabricWeavingModal
  );
  const setLoad = useAppState((state) => state.setLoad);
  const getAddFabric = useFabricStore((state) => state.getAddFabric);
  const addData = useFabricStore((state) => state.addData);
  const addFabric = useFabricStore((state) => state.addFabric);
  const loading = useFabricStore((state) => state.loading);
  const res = useFabricStore((state) => state.res);

  useEffect(() => {
    setLoad(loading);
  }, [loading]);

  useEffect(() => {
    if (res.message === "success") {
      useFabricStore.setState((state) => ({
        fabric: [],
        addData: {},
        loading: false,
        info: {},
        res: {},
      }));
      navigate("/fabric");
    }
  }, [res]);
  useEffect(() => {
    getAddFabric();
  }, []);
  useEffect(() => {
    console.log(addData);
  }, [addData]);
  const type = (item) => {
    if (item) {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          type: item,
        },
      }));
    } else {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          type: null,
        },
      }));
    }
  };
  const weaving = (item) => {
    if (item) {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          weaving: item,
        },
      }));
    } else {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          weaving: null,
        },
      }));
    }
  };

  const color = (item) => {
    if (item) {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          color: item,
        },
      }));
    } else {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          color: null,
        },
      }));
    }
  };
  const pattern = (item) => {
    if (item) {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          pattern: item,
        },
      }));
    } else {
      useFabricStore.setState((state) => ({
        ...state,
        info: {
          ...state.info,
          pattern: null,
        },
      }));
    }
  };
  const submitdata = (e) => {
    addFabric();
  };
  return (
    <div className="maindiv">
      <div className="flex w-full">
        <div className="w-1/2">
          {addData && (
            <>
              <div className="w-full divclass">
                <p className="lableClassName"> ชนิดผ้า : </p>
                <Select Data={addData?.fabricType} chooseMessage={type} />
              </div>
              <div className="w-full divclass">
                <p className="lableClassName"> เทคนิคการทอ : </p>
                <Select
                  Data={addData?.fabricTechnique}
                  chooseMessage={weaving}
                />
              </div>
              <div className="w-full divclass">
                <p className="lableClassName"> สี : </p>
                <Select Data={addData?.fabricColor} chooseMessage={color} />
              </div>
              <div className="w-full divclass">
                <p className="lableClassName"> ลาย : </p>
                <Select Data={addData?.fabricPattern} chooseMessage={pattern} />
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 space-y-5 ">
          <button
            id="submit"
            className="w-3/4 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray"
            onClick={() => setFabricWeavingModal(true)}
          >
            เพิ่มเทคนิคการทอ
          </button>
          <button
            id="submit"
            className="w-3/4 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
            onClick={() => setFabricPatternModal(true)}
          >
            เพิ่มลายผ้า
          </button>
        </div>
      </div>
      <div className="flex items-center justify-end w-full ">
        <button
          id="submit"
          className="w-32 px-4 py-2 text-white rounded-md h-fit bg-primary hover:bg-opacity-80 disabled:bg-secondary-gray "
          onClick={submitdata}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default AddFabric;
