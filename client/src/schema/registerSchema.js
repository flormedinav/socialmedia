import * as yup from "yup";

import { FORM_CONSTANTS } from "../constants/formConstants";

const registerSchema = yup.object({
  firstName: yup.string().required(FORM_CONSTANTS.ERROR.FIRST_NAME.REQUIRED),
  lastName: yup.string().required(FORM_CONSTANTS.ERROR.LAST_NAME.REQUIRED),
  email: yup
    .string()
    .email(FORM_CONSTANTS.ERROR.EMAIL.INVALID_EMAIL)
    .required(FORM_CONSTANTS.ERROR.EMAIL.REQUIRED),
  password: yup
    .string()
    .min(6, FORM_CONSTANTS.ERROR.PASSWORD.MIN_LENGTH)
    .required(FORM_CONSTANTS.ERROR.PASSWORD.REQUIRED),
  location: yup.string().required(FORM_CONSTANTS.ERROR.LOCATION.REQUIRED),
  occupation: yup.string().required(FORM_CONSTANTS.ERROR.OCUPATION.REQUIRED),
  picture: yup.string().required(FORM_CONSTANTS.ERROR.PICTURE.REQUIRED),
});

export default registerSchema;
