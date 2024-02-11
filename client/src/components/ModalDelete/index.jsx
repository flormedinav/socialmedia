import { Modal } from "antd";
import { Box, Button, useTheme } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { TYPE_THEMES } from "../../constants/global";
import { ButtonSend } from "../";

const ModalDelete = ({
  open,
  handleCancel,
  handleConfirm,
  title,
  subtitle,
  textCancel,
  textConfirm,
  confirmLoading,
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
      <ReportProblemIcon />
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
          "&:hover": {
            borderRadius: "3rem",
          },
        }}
      >
        {textCancel}
      </Button>
      <ButtonSend
        disabled={confirmLoading}
        onClick={handleConfirm}
        isLoading={confirmLoading}
        textButton={textConfirm}
      />
    </Box>
  );

  return (
    <Modal
      title={titleModal()}
      open={open}
      onCancel={handleCancel}
      className={
        palette.mode === TYPE_THEMES.DARK
          ? "custom-modal-dark"
          : "custom-modal-light"
      }
      footer={footerModal()}
    >
      <p>{subtitle}</p>
    </Modal>
  );
};

export default ModalDelete;
