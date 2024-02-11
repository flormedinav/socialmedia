import { bool, string, func } from "prop-types";
import { Modal } from "antd";
import { Box, Button, useTheme } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { TYPE_THEMES } from "../../constants/global";
import { ButtonSend } from "../";

const ModalDelete = ({
  open,
  confirmLoading,
  handleCancel,
  handleConfirm,
  title,
  subtitle,
  textCancel,
  textConfirm,
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
          color: palette.neutral.main,
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

ModalDelete.prototype = {
  open: bool,
  confirmLoading: bool,
  handleCancel: func,
  handleConfirm: func,
  title: string,
  subtitle: string,
  textCancel: string,
  textConfirm: string,
};

ModalDelete.defaultProps = {
  open: false,
  confirmLoading: false,
  handleCancel: () => {},
  handleConfirm: () => {},
  title: "",
  subtitle: "",
  textCancel: "",
  textConfirm: "",
};
