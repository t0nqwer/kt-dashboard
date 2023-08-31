import React, { useEffect, useState } from "react";
import FrontImage from "../images/Front";
import BackImage from "../images/Back";
import DetailImage from "../images/Detail";

const AddKhwantaImage = () => {
  const [FrontURL, setFrontURL] = useState("");
  const [BackURL, setBackURL] = useState("");
  const [DetailURL, setDetailURL] = useState([]);
  const [Front, setFront] = useState();
  const [Back, setBack] = useState();
  const [Detail, setDetail] = useState([]);
  const onSelectFrontFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFront("");
      return;
    }
    setFront(e.target.files[0]);
  };
  const onSelectBackFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setBack("");
      return;
    }
    setBack(e.target.files[0]);
  };
  const onSelectDetailFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setDetail("");
      return;
    }
    setDetail([...e.target.files]);
  };
  useEffect(() => {
    if (!Front) {
      setFrontURL("");
      return;
    }
    const objectUrl = URL.createObjectURL(Front);
    setFrontURL(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [Front]);
  useEffect(() => {
    if (!Detail || Detail?.length === 0) {
      setDetailURL([]);
      return;
    }

    const objectUrl = Detail.map((e) => URL.createObjectURL(e));
    setDetailURL([...DetailURL, ...objectUrl]);
    return () => URL.revokeObjectURL(objectUrl);
  }, [Detail]);
  useEffect(() => {
    if (!Back) {
      setBackURL("");
      return;
    }
    const objectUrl = URL.createObjectURL(Back);
    setBackURL(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [Back]);
  const deletePhoto = (e) => {
    setDetailURL(DetailURL.filter((p) => p !== e.target.id));
  };
  return (
    <div className="flex mb-10">
      {" "}
      <FrontImage onSelectFrontFile={onSelectFrontFile} FrontURL={FrontURL} />
      <BackImage onSelectBackFile={onSelectBackFile} BackURL={BackURL} />
      <DetailImage
        deletePhoto={deletePhoto}
        DetailURL={DetailURL}
        onSelectDetailFile={onSelectDetailFile}
      />
    </div>
  );
};

export default AddKhwantaImage;
