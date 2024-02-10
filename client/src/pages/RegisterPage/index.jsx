import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { Box, useMediaQuery, TextField } from "@mui/material";

import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import {
  FORM_BUTTON_CONSTANTS,
  FORM_CONSTANTS,
} from "../../constants/formConstants";
import { registerSchema } from "../../schema";
import { FormBase, FormButton, UploadImage } from "../../components";
import { FIELD_CONFIG_REGISTER } from "../../constants/formConstants";
import { authRegister } from "../../services/authServices";
import { setLogin } from "../../state/slices/authSlice";
import { setFriends, setUser } from "../../state/slices/userSlice";
import { createUrlCloudinary } from "../../services/cloudinaryServices";

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const IMAGE_WELCOME = 'url("assets/login/login-op13.jpg")';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    if (image) {
      const responsePicture = await createUrlCloudinary(image);
      values.picture = responsePicture.data.secure_url;
    }

    const response = await authRegister(values);

    if (response) {
      dispatch(setLogin(response?.data));
      dispatch(setUser(response?.data));
      dispatch(setFriends(response?.data.friends));

      navigate("/home");
    }

    setIsLoading(false);
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
              {FIELD_CONFIG_REGISTER.map((group, index) => (
                <Box
                  key={index}
                  display="flex"
                  flexDirection={isNonMobileScreens ? "row" : "column"}
                  justifyContent="space-between"
                  gap="1rem"
                >
                  {group.map(({ name, label, type }) => (
                    <TextField
                      key={name}
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

            <UploadImage
              setFieldValue={(formImage) => {
                setImage(formImage);
                setFieldValue("picture", formImage);
              }}
              fileName={fileName}
              setFileName={setFileName}
              errors={errors}
              touched={touched}
              text={FORM_CONSTANTS.LABELS.UPLOAD_IMGAE}
            />

            <FormButton
              text={FORM_BUTTON_CONSTANTS.REGISTER.TEXT}
              question={FORM_BUTTON_CONSTANTS.REGISTER.QUESTION}
              textRedirect={FORM_BUTTON_CONSTANTS.REGISTER.TEXT_REDIRECT}
              pathRedirect={FORM_BUTTON_CONSTANTS.REGISTER.PATH_REDIRECT}
              disabled={isLoading}
            />
          </form>
        )}
      </Formik>
    </FormBase>
  );
};

export default RegisterPage;
