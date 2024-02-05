import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import {
  GLOBAL_CONSTANST,
  MEDIA_QUERY_MIN_WIDTH,
} from "../../constants/global";
import Logo from "../../components/Logo";

const LoginPage = () => {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH);

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Logo />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          {GLOBAL_CONSTANST.DESCRIPTION_WELCOME}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
