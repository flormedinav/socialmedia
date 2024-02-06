import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Field } from "formik";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormInputImage = ({ errors, touched, setFieldValue }) => {
  const theme = useTheme();
  const [previewSource, setPreviewSource] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  console.log({ errors, touched });
  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const preview = URL.createObjectURL(file);
      setPreviewSource(preview);
      setUploadStatus("loading");

      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "social-media");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwyt8jlrl/image/upload",
        formData
      );
      console.log({ response });
      // Update the value of `values.image`
      setFieldValue("picture", response.data.secure_url);
      setUploadStatus("success");
    } catch (error) {
      console.error("Error uploading image to Cloudinary: ", error);
      setUploadStatus("error");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "1.5rem",
      }}
    >
      <Field>
        {({ field, form }) => (
          <>
            <Box display="flex" alignItems="center" gap="1rem">
              <input
                {...field}
                accept="image/*"
                id="upload-image"
                name="picture"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  field.onChange(event);
                  handleImageUpload(event);
                }}
                onBlur={field.onBlur}
                value="" // dejar el valor vacío
              />
              <label htmlFor="upload-image">
                <Button
                  variant="text"
                  color="primary"
                  size="medium"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  sx={{ width: "100%" }}
                >
                  Subir imagen de perfil
                </Button>
              </label>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  overflow: "hidden",
                }}
              >
                {uploadStatus === "loading" ? (
                  <CircularProgress size={20} />
                ) : previewSource ? (
                  <ImgStyled src={previewSource} alt="Preview" />
                ) : (
                  //
                  <></>
                )}
              </Box>
            </Box>

            <Box>
              {touched.picture && errors.picture && (
                <Typography
                  variant="body2"
                  sx={{
                    mt: "0.25rem",
                    color: theme.palette.error.main,
                    ml: "1rem",
                    fontSize: "10.3px",
                  }}
                >
                  {errors.picture}
                </Typography>
              )}

              {uploadStatus === "success" && (
                <Alert
                  severity="success"
                  variant="outlined"
                  sx={{
                    mt: "0.75rem",
                    color: theme.palette.success.main,
                    borderColor: theme.palette.success.main,
                  }}
                >
                  La imagen se ha subido con éxito.
                </Alert>
              )}

              {uploadStatus === "error" && (
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{
                    mt: "0.75rem",
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                  }}
                >
                  Error al subir la imagen. Por favor, inténtalo de nuevo.
                </Alert>
              )}
            </Box>
          </>
        )}
      </Field>
    </Box>
  );
};

const ImgStyled = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const ImgDefaultStyled = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

export default FormInputImage;
