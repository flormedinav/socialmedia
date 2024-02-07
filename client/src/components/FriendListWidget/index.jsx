import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, useTheme } from "@mui/material";

import { WidgetWrapper, Friend, FlexBetween } from "../";
import { setFriends } from "../../state/slices/userSlice";
import { getUserFriends } from "../../services/usersServices";
import { FRIENDS_CONSTANTS } from "../../constants/friendsConstants";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const { friends } = user;

  const getFriends = async () => {
    const response = await getUserFriends({ userId, token });

    dispatch(setFriends(response.data));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {FRIENDS_CONSTANTS.LIST_FRIENDS.TITLE}
      </Typography>

      {friends && friends.length !== 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem" mb="1.5rem">
          {friends?.map((friend) => (
            <Friend
              key={friend?._id}
              friendId={friend?._id}
              name={`${friend?.firstName} ${friend?.lastName}`}
              subtitle={friend?.occupation}
              userPicture={friend?.picture}
              sizePicture="45px"
            />
          ))}
        </Box>
      ) : (
        <Typography
          color={palette.neutral.medium}
          sx={{ mb: "1.5rem", mt: "1.5rem" }}
        >
          {FRIENDS_CONSTANTS.LIST_FRIENDS.NOT_FRIENDS}
        </Typography>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
