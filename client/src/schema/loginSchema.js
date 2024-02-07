import * as yup from "yup";

import { FORM_CONSTANTS } from "../constants/formConstants";

const loginSchema = yup.object({
  email: yup
    .string()
    .email(FORM_CONSTANTS.ERROR.EMAIL.INVALID_EMAIL)
    .required(FORM_CONSTANTS.ERROR.EMAIL.REQUIRED),
  password: yup.string().required(FORM_CONSTANTS.ERROR.PASSWORD.REQUIRED),
});

export default loginSchema;
