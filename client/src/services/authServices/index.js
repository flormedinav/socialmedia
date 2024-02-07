import instance from "../../config";
import { SERVICES_MESSAGES } from "../../constants/servicesMessages";
import { TYPE_TOAST, callToast } from "../../utils/toast";

export const authLogin = async (formData) => {
  try {
    const response = await instance.post("/auth/login", formData);

    sessionStorage.setItem("token", response.data.data.token);

    return response.data;
  } catch (error) {
    console.error("Error in getAuthLogin: ", error);

    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.AUHT.ERROR.LOGIN
    );
  }
};

export const authRegister = async (formData) => {
  try {
    const response = await instance.post("/auth/register", formData);

    sessionStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Error in getAuthRegister: ", error);
    callToast(
      TYPE_TOAST.ERROR,
      error.response.data.error || SERVICES_MESSAGES.AUHT.ERROR.REGISTER
    );
  }
};
