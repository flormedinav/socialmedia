import { Link } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { TYPE_THEMES } from "../../../constants/global";

const FormButton = ({
  text,
  question,
  textRedirect,
  pathRedirect,
  disabled,
}) => {
  const { palette } = useTheme();

  return (
    <Box>
      <Button
        fullWidth
        type="submit"
        size="medium"
        disabled={disabled}
        sx={{
          m: "1.5rem 0",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
          "&.Mui-disabled": {
            color:
              palette.mode === TYPE_THEMES.LIGHT
                ? "rgba(0, 0, 0, 0.3)"
                : "rgba(255, 255, 255, 0.2)",
            backgroundColor: palette.neutral.light,
          },
        }}
      >
        {disabled ? <CircularProgress size={20} /> : <>{text}</>}
      </Button>
      <Typography variant="body1">
        {question}
        <Button
          variant="text"
          color="secondary"
          size="small"
          sx={{
            marginLeft: "0.5rem",
            color: palette.primary.main,
            "&.Mui-disabled": {
              color:
                palette.mode === TYPE_THEMES.LIGHT
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.2)",
              backgroundColor: palette.neutral.light,
            },
          }}
          component={Link}
          to={pathRedirect}
          disabled={disabled}
        >
          {textRedirect}
        </Button>
      </Typography>
    </Box>
  );
};

export default FormButton;
