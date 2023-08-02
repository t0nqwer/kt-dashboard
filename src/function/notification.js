import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiErrorWarningFill, RiCheckboxCircleFill } from "react-icons/ri";
import { PiHandsPrayingBold } from "react-icons/pi";
export const notify = (e) =>
  toast.dark(e, {
    position: "top-right",
    theme: "light",
    Style: { backgroundColor: "#F1F2F2" },
    icon: (
      <RiErrorWarningFill
        style={{ Color: "crimson", color: "crimson", fontSize: "30px" }}
      />
    ),
  });
export const notifySuccess = (e) =>
  toast.dark(e, {
    position: "top-right",
    theme: "light",
    Style: { backgroundColor: "#F1F2F2" },
    icon: (
      <RiCheckboxCircleFill
        style={{ Color: "crimson", color: "green", fontSize: "30px" }}
      />
    ),
  });
export const notifyPray = (e) =>
  toast.dark(e, {
    position: "top-right",
    theme: "light",
    Style: { backgroundColor: "#F1F2F2", color: "#B51530" },
    icon: (
      <PiHandsPrayingBold
        style={{ Color: "crimson", color: "#B51530", fontSize: "30px" }}
      />
    ),
  });
