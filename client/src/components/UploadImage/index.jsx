import { func, string, shape } from "prop-types";
import { Box, Typography, useTheme } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { EditOutlined } from "@mui/icons-material";

const UploadImage = ({
  setFieldValue,
  setFileName,
  setPreviewImage,
  fileName,
  errors,
  touched,
  text,
}) => {
  const { palette } = useTheme();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (setPreviewImage) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "social-media");

    setFieldValue(formData);
    setFileName(file.name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "1.5rem",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        sx={{
          height: "45px",
          border: "1px solid",
          borderColor: palette.neutral.medium,
          backgroundColor: palette.neutral.light,
          p: "1rem",
          borderRadius: "9px",
        }}
      >
        <input
          accept="image/*"
          id="upload-image"
          name="picture"
          type="file"
          style={{ display: "none" }}
          onChange={(event) => {
            handleImageUpload(event);
          }}
          value=""
        />
        <label htmlFor="upload-image">
          <Box
            variant="text"
            color={palette.neutral.main}
            size="medium"
            display="flex"
            alignItems="center"
            sx={{
              width: "100%",
              cursor: "pointer",
            }}
          >
            {fileName ? (
              <>
                <EditOutlined />
                <Typography ml="1rem">{fileName}</Typography>
              </>
            ) : (
              <>
                <CloudUploadIcon />
                <Typography ml="1rem">{text}</Typography>
              </>
            )}
          </Box>
        </label>
      </Box>
      {errors && touched && (
        <>
          {touched.picture && errors.picture && (
            <Typography
              variant="body2"
              sx={{
                mt: "0.25rem",
                color: palette.error.main,
                ml: "1rem",
                fontSize: "10.3px",
              }}
            >
              {errors.picture}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default UploadImage;

UploadImage.propTypes = {
  setFieldValue: func,
  setFileName: func,
  fileName: string,
  text: string,
  errors: shape({}),
  touched: shape({}),
};

UploadImage.defaultProps = {
  setFieldValue: () => {},
  setFileName: () => {},
  fileName: "",
  text: "",
  errors: null,
  touched: null,
};
