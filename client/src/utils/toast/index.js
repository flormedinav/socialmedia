import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toastConfig = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

export const TYPE_TOAST = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
};

export const callToast = (type, message) => {
  toast[type](message, toastConfig);
};
