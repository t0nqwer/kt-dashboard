import React, { useEffect, useState, useRef } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
const Select = ({ chooseMessage, Data, selectvalue, placeholder }) => {
  const [Selectvalue, setSelectvalue] = useState("");
  const [SearchData, setSearchData] = useState([]);
  const [Focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const [index, setIndex] = useState(0);
  const [hoverData, setHoverData] = useState("");
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    if (!selectvalue) {
      setSelectvalue("");
    }
  }, [Data]);
  useEffect(() => {
    if (selectvalue) {
      setSelectvalue(selectvalue);
    }
  }, [selectvalue]);
  useEffect(() => {
    if (Data?.length > 0 || Data) {
      const search = Data?.filter((e) => e.toString().includes(Selectvalue));
      const correct = Data?.filter((e) => e === Selectvalue);
      if (search.length !== 0 && correct.length === 1) {
        setFocus(false);
      } else if (inputFocus) {
        setFocus(true);
      }
      setSearchData(search);
      if (Selectvalue === "" && inputFocus) {
        setSearchData(Data);
        setFocus(true);
      }
      chooseMessage(Selectvalue);
    }
  }, [Selectvalue, Data]);
  const handleClick = (e) => {
    setSelectvalue(e.currentTarget.id);
  };
  useEffect(() => {
    // if (Focus === false) {
    //   const search = Data?.filter((e) => e.toString().includes(Selectvalue));
    //   if (search?.length === 0) setSelectvalue("");
    // }
  }, [Focus]);
  const handleKeydown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setIndex(index + 1);
        break;
      case "ArrowUp":
        if (index === 0) break;
        setIndex(index - 1);
        break;
      case "Enter":
        setIndex(0);
        setSelectvalue(hoverData);
        break;
      default:
        break;
    }
  };
  const handleHover = (e) => {
    const getIndex = SearchData?.indexOf(e.currentTarget.id);
    setIndex(getIndex + 1);
    setHoverData(e.currentTarget.id);
  };
  useEffect(() => {
    setHoverData(SearchData[index - 1]);
  }, [index]);
  return (
    <div
      className="relative block grow"
      onFocus={() => {
        // setSelectvalue("");
        setFocus(true);
      }}
      onBlurCapture={(E) => {
        if (hover) {
          setSelectvalue(E.target.value);
          return;
        }
        return setFocus(false);
      }}
      onKeyDown={handleKeydown}
    >
      <input
        className="w-full text-center input"
        value={Selectvalue}
        placeholder={placeholder}
        onChange={(e) => setSelectvalue(e.target.value)}
        onFocus={() => setInputFocus(true)}
        onBlurCapture={(E) => {
          setInputFocus(false);
        }}
      />
      {Focus && (
        <div
          className="absolute z-30 w-full mt-1 overflow-hidden overflow-y-scroll text-center rounded-md shadow-md bg-secondary-light text-primary max-h-72 "
          onMouseOver={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {SearchData?.map((e) => (
            <div
              key={e}
              id={e}
              className={`w-full py-1 cursor-pointer text-xl ${
                e === hoverData ? "bg-primary text-secondary-light" : ""
              }`}
              onMouseOver={handleHover}
              onClick={handleClick}
            >
              {e}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
