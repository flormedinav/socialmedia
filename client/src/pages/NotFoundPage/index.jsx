import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

import { Logo, Navbar, WidgetWrapper } from "../../components";
import { NOT_FOUND_CONSTANTS } from "../../constants/notFoundConstants";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar isNavigate />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: "4rem",
        }}
      >
        <WidgetWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            gap: "2rem",
            p: {
              xs: "1.5rem",
              sm: "3rem",
            },
            m: {
              xs: "1rem",
              sm: "1.5rem",
            },
          }}
        >
          {/* <Logo />  */}
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
            }}
          >
            {NOT_FOUND_CONSTANTS.TITLE}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
            }}
          >
            {NOT_FOUND_CONSTANTS.SUBTITLE}
          </Typography>
          <Button variant="outlined" component={Link} to="/home">
            {NOT_FOUND_CONSTANTS.TEXT_BUTTON}
          </Button>
          <ImgStyled src="assets/logo.png" alt="Logo de la aplicación" />
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

const ImgStyled = styled.img`
  width: 50px;
`;
