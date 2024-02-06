import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Box, useTheme, useMediaQuery, TextField } from "@mui/material";

import {
  FORM_BUTTON_CONSTANTS,
  FORM_CONSTANTS,
  MEDIA_QUERY_MIN_WIDTH,
} from "../../constants/global";
import { registerSchema } from "../../schema";
import { FormBase, FormButton, FormInputImage } from "../../components";
import { FIELD_CONFIG_REGISTER } from "../../constants/fieldConfigRegister";
import { authRegister } from "../../services";

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  ocupation: "",
  picture: "",
};

const IMAGE_WELCOME = 'url("assets/login/login-op13.jpg")';

const RegisterPage = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await authRegister(values);

    if (response) {
      dispatch(setLogin(response?.data));
      dispatch(setUser(response?.data));

      navigate("/home");
    }
  };

  return (
    <FormBase
      backgroundImage={IMAGE_WELCOME}
      description={FORM_CONSTANTS.DESCRIPTION_WELCOME.REGISTER}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesRegister}
        validationSchema={registerSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="1.5rem">
              {FIELD_CONFIG_REGISTER.map((group) => (
                <Box
                  display="flex"
                  flexDirection={isNonMobileScreens ? "row" : "column"}
                  justifyContent="space-between"
                  gap="1rem"
                >
                  {group.map(({ name, label, type }) => (
                    <TextField
                      label={label}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values[name]}
                      name={name}
                      error={Boolean(touched[name]) && Boolean(errors[name])}
                      helperText={touched[name] && errors[name]}
                      size="small"
                      sx={{ width: isNonMobileScreens ? "50%" : "100%" }}
                      type={type}
                    />
                  ))}
                </Box>
              ))}
            </Box>

            <FormInputImage
              errors={errors}
              touched={touched}
              setFieldValue={setFieldValue}
            />

            <FormButton
              text={FORM_BUTTON_CONSTANTS.REGISTER.TEXT}
              question={FORM_BUTTON_CONSTANTS.REGISTER.QUESTION}
              textRedirect={FORM_BUTTON_CONSTANTS.REGISTER.TEXT_REDIRECT}
              pathRedirect={FORM_BUTTON_CONSTANTS.REGISTER.PATH_REDIRECT}
            />
          </form>
        )}
      </Formik>
    </FormBase>
  );
};

export default RegisterPage;
