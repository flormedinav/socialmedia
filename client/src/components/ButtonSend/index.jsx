import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@emotion/react";

import { colorTokens } from "../../theme";
import { TYPE_THEMES } from "../../constants/global";

const ButtonSend = ({ disabled, onClick, isCreating, textButton }) => {
  const { palette } = useTheme();

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        color: colorTokens.grey[10],
        backgroundColor: isCreating
          ? palette.neutral.light
          : palette.primary.main,
        borderRadius: "3rem",
        p: "8px 16px",
        "&:hover": {
          backgroundColor: colorTokens.primary[600],
          color: colorTokens.grey[10],
        },
        "&.Mui-disabled": {
          color:
            palette.mode === TYPE_THEMES.LIGHT
              ? "rgba(0, 0, 0, 0.3)"
              : "rgba(255, 255, 255, 0.2)",
          backgroundColor: palette.neutral.light,
        },
      }}
    >
      {isCreating ? <CircularProgress size={20} /> : <>{textButton}</>}
    </Button>
  );
};

export default ButtonSend;