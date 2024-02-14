import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import Logo from "../../Logo";
import { MEDIA_QUERY_MIN_WIDTH, TYPE_THEMES } from "../../../constants/global";

const FormBase = ({ backgroundImage, description, children, isRegister }) => {
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNonMobileScreens ? "row" : "column",
        height: isNonMobileScreens ? "100vh" : isRegister ? "auto" : "100%",
        overflow: "hidden",
        backgroundColor: TYPE_THEMES.DARK ? palette.background.alt : "inherit",
      }}
    >
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        display="flex"
        flexDirection="column"
        p={isNonMobileScreens ? "3rem 6rem" : "1.5rem 2rem"}
        m={isNonMobileScreens ? "2rem auto" : "1rem auto"}
        gap="1rem"
      >
        <Logo />
        <Typography fontWeight="500" variant="h4" sx={{ mb: "1rem" }}>
          {description}
        </Typography>

        {children}
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: isNonMobileScreens ? "100vh" : "100%",
          minHeight: "300px",
          width: isNonMobileScreens ? "50%" : "100%",
        }}
      />
    </Box>
  );
};

export default FormBase;
