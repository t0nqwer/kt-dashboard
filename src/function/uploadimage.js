import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadimage = (id, Front, Back, Detail, name) => {
  const promises = [];
  promises.push(uploadTaskDetail(), uploadTaskBack(), uploadTaskFront());
  async function uploadTaskDetail() {
    const uploadimg = Detail?.map(async (e, index) => {
      const fileRef = ref(storage, `${id}/detail/${name}-${index}-detail`);
      const uploadTaskSnapshot = await uploadBytes(fileRef, e);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      return downloadURL;
    });

    const returndata = await Promise.all(uploadimg);
    return returndata;
  }
  async function uploadTaskBack() {
    const file = Back;
    const fileRef = ref(storage, `${id}/back/${name}-back`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

    return downloadURL;
  }
  async function uploadTaskFront() {
    const file = Front;
    const fileRef = ref(storage, `${id}/front/${name}-front`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadFrontURL = await getDownloadURL(uploadTaskSnapshot.ref);

    return downloadFrontURL;
  }
  return Promise.all(promises);
};
export const uploadproductimage = (id, Front, Back, Detail, name) => {
  const promises = [];
  promises.push(uploadTaskDetail(), uploadTaskBack(), uploadTaskFront());
  async function uploadTaskDetail() {
    const uploadimg = Detail?.map(async (e, index) => {
      const fileRef = ref(storage, `${id}/${name}/${name}-${index}-detail`);
      const uploadTaskSnapshot = await uploadBytes(fileRef, e);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      return downloadURL;
    });
    const returndata = await Promise.all(uploadimg);
    return returndata;
  }
  async function uploadTaskBack() {
    const file = Back;
    const fileRef = ref(storage, `${id}/${name}/${name}-back`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);

    return downloadURL;
  }
  async function uploadTaskFront() {
    const file = Front;
    const fileRef = ref(storage, `${id}/${name}/${name}-front`);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadFrontURL = await getDownloadURL(uploadTaskSnapshot.ref);

    return downloadFrontURL;
  }
  return Promise.all(promises);
};
