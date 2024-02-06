import { Link } from "react-router-dom";

import { Box, Button, Typography, useTheme } from "@mui/material";

const FormButton = ({ text, question, textRedirect, pathRedirect }) => {
  const { palette } = useTheme();

  return (
    <Box>
      <Button
        fullWidth
        type="submit"
        size="medium"
        sx={{
          m: "1.5rem 0",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
      >
        {text}
      </Button>
      <Typography variant="body1">
        {question}
        <Button
          variant="text"
          color="secondary"
          size="small"
          sx={{ marginLeft: "0.5rem", color: palette.primary.main }}
          component={Link}
          to={pathRedirect}
        >
          {textRedirect}
        </Button>
      </Typography>
    </Box>
  );
};

export default FormButton;
