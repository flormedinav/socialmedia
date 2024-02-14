import { Box, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.background.alt,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mt: "1rem",
          color: palette.neutral.medium,
          marginBottom: "1rem",
        }}
      >
        Copyright © {currentYear} SocialMedia by Florencia Medina.
      </Typography>
    </Box>
  );
};

export default Footer;
