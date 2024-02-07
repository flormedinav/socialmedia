import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Search, DarkMode, LightMode, Menu, Close } from "@mui/icons-material";

import { setMode } from "../../state/slices/generalSlice";
import { setLogout } from "../../state/slices/authSlice";
import { FlexBetween, Logo } from "../";
import { MEDIA_QUERY_MIN_WIDTH, TYPE_THEMES } from "../../constants/global";
import { NAVBAR_CONSTANTS } from "../../constants/navbarConstants";
import { setClearUser } from "../../state/slices/userSlice";

const Navbar = ({ isNavigate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const { user } = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const { palette } = useTheme();

  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const alt = palette.background.alt;

  const fullName = `${user ? user?.firstName : "John"} ${
    user ? user?.lastName : "Smite"
  }`;

  const handleClickLogout = () => {
    dispatch(setLogout());
    dispatch(setClearUser());
    navigate("/");
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Logo isNavigate={isNavigate} />
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === TYPE_THEMES.DARK ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "9px",
                padding: "0.1rem 1.5rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>
                {NAVBAR_CONSTANTS.LOG_OUT}
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
          p="1rem"
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {palette.mode === TYPE_THEMES.DARK ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <FormControl
              variant="standard"
              value={fullName}
              sx={{
                width: "100%",
              }}
            >
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "100%",
                  borderRadius: "9px",
                  padding: "0.1rem 1rem",
                  "& .MuiSvgIcon-root": {
                    width: "5rem",
                    pl: "0.5rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  {NAVBAR_CONSTANTS.LOG_OUT}
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
