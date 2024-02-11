import { bool, string, func } from "prop-types";
import { Box, Button, IconButton, InputBase, useTheme } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal } from "antd";
import { styled } from "@mui/system";

import { UploadImage, ButtonSend } from "../";
import { TYPE_THEMES } from "../../constants/global";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";

const ModalPostEdit = ({
  open,
  confirmLoading,
  disabledButtonConfirm,
  title,
  textCancel,
  textConfirm,
  description,
  fileName,
  previewImage,
  handleCancel,
  handleConfirm,
  handleChangeEdit,
  setFileName,
  setImage,
  setPreviewImage,
  handleClickDeleteImage,
}) => {
  const { palette } = useTheme();

  const titleModal = () => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <p>{title}</p>
    </Box>
  );

  const footerModal = () => (
    <Box
      sx={{
        display: "flex",
        gap: "0.75rem",
        justifyContent: "flex-end",
      }}
    >
      <Button
        variant="text"
        onClick={handleCancel}
        disabled={confirmLoading}
        sx={{
          color: palette.neutral.main,
          "&:hover": {
            borderRadius: "3rem",
          },
        }}
      >
        {textCancel}
      </Button>
      <ButtonSend
        disabled={disabledButtonConfirm || confirmLoading}
        onClick={handleConfirm}
        isLoading={confirmLoading}
        textButton={textConfirm}
        backgroundColor={TYPE_THEMES.DARK && palette.neutral.mediumLight2}
      />
    </Box>
  );

  return (
    <Modal
      title={titleModal()}
      open={open}
      onOk={handleConfirm}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      className={
        palette.mode === TYPE_THEMES.DARK
          ? "custom-modal-edit custom-modal-dark"
          : "custom-modal-edit custom-modal-light"
      }
      footer={footerModal()}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <InputBase
          onChange={handleChangeEdit}
          value={description}
          sx={{
            width: "100%",
            backgroundColor:
              palette.mode === TYPE_THEMES.DARK
                ? palette.neutral.mediumLight2
                : palette.neutral.light,
            borderRadius: "2rem",
            padding: ".5rem 1.5rem",
          }}
        />
        {previewImage && previewImage.length > 0 && (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              mt: "1rem",
            }}
          >
            <ImgStyled alt="post" src={previewImage} />
            <DeleteButton onClick={handleClickDeleteImage}>
              <DeleteOutlineIcon />
            </DeleteButton>
          </Box>
        )}

        <Box>
          <UploadImage
            text={
              previewImage
                ? POSTS_CONSTANTS.POSTS.MODAL_EDIT.UPLOAD_PHOTO
                : POSTS_CONSTANTS.POSTS.MODAL_EDIT.ADD_PHOTO
            }
            setFieldValue={setImage}
            fileName={fileName}
            setFileName={setFileName}
            setPreviewImage={setPreviewImage}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalPostEdit;

const ImgStyled = styled("img")({
  width: "100%",
  maxHeight: "300px",
  position: "relative",
  borderRadius: "0.75rem",
  objectFit: "cover",
});

const DeleteButton = styled(IconButton)({
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: "rgba(244, 67, 54, 0.2)",
  color: "#d32f2f",
  "&:hover": {
    backgroundColor: "rgba(244, 67, 54, 0.08)",
  },
});

ModalPostEdit.prototype = {
  open: bool,
  confirmLoading: bool,
  disabledButtonConfirm: bool,
  title: string,
  textCancel: string,
  textConfirm: string,
  description: string,
  fileName: string,
  previewImage: string,
  handleCancel: func,
  handleConfirm: func,
  handleChangeEdit: func,
  setFileName: func,
  setImage: func,
  setPreviewImage: func,
  handleClickDeleteImage: func,
};

ModalPostEdit.defaultProps = {
  open: false,
  confirmLoading: false,
  disabledButtonConfirm: false,
  title: "",
  textCancel: "",
  textConfirm: "",
  description: "",
  fileName: "",
  previewImage: "",
  handleCancel: () => {},
  handleConfirm: () => {},
  handleChangeEdit: () => {},
  setFileName: () => {},
  setImage: () => {},
  setPreviewImage: () => {},
  handleClickDeleteImage: () => {},
};
