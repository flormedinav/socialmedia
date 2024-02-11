import { string } from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  CircularProgress,
} from "@mui/material";

import { FlexBetween, WidgetWrapper, AvatarUser } from "../";
import { getUser } from "../../services/usersServices";
import { USER_CONSTANTS } from "../../constants/userConstans";
import { checkString, stringToZero } from "../../utils/formatedString";

const UserWidget = ({ user, userId }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  const darkColor = palette.neutral.dark;
  const mediumColor = palette.neutral.medium;
  const mainColor = palette.neutral.main;

  if (!user) {
    return (
      <WidgetWrapper
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </WidgetWrapper>
    );
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    picture,
    totalPosts,
    totalLikes,
    friends,
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween gap="0.5rem" pb="1.1rem">
        <FlexBetween gap="1rem">
          <AvatarUser
            picture={picture}
            firstName={firstName}
            lastName={lastName}
            size={60}
          />
          <Box>
            <Typography
              variant="h4"
              color={darkColor}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/profile/${userId}`)}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={mediumColor}>
              {friends?.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="medium" sx={{ color: mainColor }} />
          <Typography color={mediumColor}>{checkString(location)}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="medium" sx={{ color: mainColor }} />
          <Typography color={mediumColor}>{checkString(occupation)}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={mediumColor}>
            {`${USER_CONSTANTS.TOTAL_POSTS} `}
          </Typography>
          <Typography color={mainColor} fontWeight="500">
            {stringToZero(totalPosts)}
          </Typography>
        </FlexBetween>
        <FlexBetween mb="0.5rem">
          <Typography color={mediumColor}>
            {`${USER_CONSTANTS.TOTAL_LIKES} `}
          </Typography>
          <Typography color={mainColor} fontWeight="500">
            {stringToZero(totalLikes)}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box p="1rem 0">
        <Typography
          fontSize="1rem"
          color={mainColor}
          fontWeight="500"
          mb="1rem"
        >
          {USER_CONSTANTS.SOCIAL_PROFILES.TITLE}
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img src="../assets/twitter.png" alt="twitter" />
            <Box>
              <Typography color={mainColor} fontWeight="500">
                {USER_CONSTANTS.SOCIAL_PROFILES.TWITTER.TEXT}
              </Typography>
              <Typography color={mediumColor}>
                {USER_CONSTANTS.SOCIAL_PROFILES.TWITTER.DESCRIPTION}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: mainColor }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box>
              <Typography color={mainColor} fontWeight="500">
                {USER_CONSTANTS.SOCIAL_PROFILES.LINKEDIN.TEXT}
              </Typography>
              <Typography color={mediumColor}>
                {USER_CONSTANTS.SOCIAL_PROFILES.LINKEDIN.DESCRIPTION}
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: mainColor }} />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;

UserWidget.propTypes = {
  userId: string,
};

UserWidget.defaultProps = {
  userId: "",
};
