import { useNavigate } from "react-router-dom";
import { Box, TextField, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";

import { FORM_BUTTON_CONSTANTS, FORM_CONSTANTS } from "../../constants/global";
import { FormBase, FormButton } from "../../components";
import { Formik } from "formik";
import { loginSchema } from "../../schema";
import { authLogin } from "../../services";
import { setLogin } from "../../state/slices/authSlice";
import { setUser } from "../../state/slices/userSlice";

const initialValuesLogin = {
  email: "",
  password: "",
};

const IMAGE_WELCOME = 'url("assets/login/login-op12.jpg")';

const LoginPage = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await authLogin(values);

    if (response) {
      dispatch(setLogin(response?.data));
      dispatch(setUser(response?.data));

      navigate("/home");
    }
  };

  return (
    <FormBase
      backgroundImage={IMAGE_WELCOME}
      description={FORM_CONSTANTS.DESCRIPTION_WELCOME.LOGIN}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="1.5rem">
              <TextField
                label={FORM_CONSTANTS.LABELS.EMAIL}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name={FORM_CONSTANTS.NAME.EMAIL}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                size="small"
              />
              <TextField
                label={FORM_CONSTANTS.LABELS.PASSWORD}
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name={FORM_CONSTANTS.NAME.PASSWORD}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                size="small"
              />
            </Box>

            <FormButton
              text={FORM_BUTTON_CONSTANTS.LOGIN.TEXT}
              question={FORM_BUTTON_CONSTANTS.LOGIN.QUESTION}
              textRedirect={FORM_BUTTON_CONSTANTS.LOGIN.TEXT_REDIRECT}
              pathRedirect={FORM_BUTTON_CONSTANTS.LOGIN.PATH_REDIRECT}
            />
          </form>
        )}
      </Formik>
    </FormBase>
  );
};

export default LoginPage;