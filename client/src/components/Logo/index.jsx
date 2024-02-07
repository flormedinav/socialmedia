import { Typography } from "@mui/material";
import { useTheme } from "@mui/material";

import { GLOBAL_CONSTANST } from "../../constants/global";
import { useNavigate } from "react-router-dom";

const Logo = ({ isNavigate }) => {
  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;

  const getStylesLogo = () => {
    if (isNavigate) {
      return {
        "&:hover": {
          color: primaryLight,
          cursor: isCursorPointer,
        },
      };
    }
  };
  const isCursorPointer = isNavigate ? "pointer" : "unset";

  const handleClick = () => {
    if (isNavigate) {
      navigate("/home");
    }
  };

  return (
    <Typography
      fontWeight="bold"
      fontSize="clamp(1rem, 2rem, 2.25rem)"
      color={palette.primary.main}
      onClick={handleClick}
      sx={getStylesLogo()}
    >
      {GLOBAL_CONSTANST.NAME_SOCIAL_MEDIA}
    </Typography>
  );
};

export default Logo;
