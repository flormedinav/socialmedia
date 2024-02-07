import axios from "axios";

import { SERVICES_MESSAGES } from "../../constants/servicesMessages";
import { TYPE_TOAST, callToast } from "../../utils/toast";

export const createUrlCloudinary = async (formData) => {
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dwyt8jlrl/image/upload",
      formData
    );

    return response;
  } catch (error) {
    console.error("Error in createUrlCloudinary: ", error);

    callToast(TYPE_TOAST.ERROR, SERVICES_MESSAGES.CLOUDINARY.ERROR.GENERAL);
  }
};
