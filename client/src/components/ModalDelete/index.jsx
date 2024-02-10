import { Modal } from "antd";
import { Box, useTheme } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import "./styles.css";

import { TYPE_THEMES } from "../../constants/global";

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

  return (
    <Modal
      title={titleModal()}
      open={open}
      onOk={handleConfirm}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      cancelText={textCancel}
      okText={textConfirm}
      className={
        palette.mode === TYPE_THEMES.DARK
          ? "custom-modal-dark"
          : "custom-modal-light"
      }
    >
      <p>{subtitle}</p>
    </Modal>
  );
};

export default ModalDelete;
