import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import Logo from "../../Logo";
import { MEDIA_QUERY_MIN_WIDTH } from "../../../constants/global";

const FormBase = ({ backgroundImage, description, children }) => {
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isNonMobileScreens ? "row" : "column",
        maxHeight: isNonMobileScreens ? "100vh" : "auto",
        overflow: "hidden",
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
        width={isNonMobileScreens ? "50%" : "93%"}
        sx={{
          overflow: "hidden",
          backgroundImage: backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: isNonMobileScreens ? "100vh" : "300px",
          width: isNonMobileScreens ? "50%" : "100%",
        }}
      />
    </Box>
  );
};

export default FormBase;
