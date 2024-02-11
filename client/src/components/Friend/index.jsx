import { func, string, bool } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { setFriends } from "../../state/slices/userSlice";
import { FlexBetween, AvatarUser, MoreAction } from "../";
import { addRemoveFriend } from "../../services/usersServices";

const Friend = ({
  friendId,
  name,
  subtitle,
  userPicture,
  sizePicture,
  sizeIcon,
  sizeName,
  isPosts,
  anchorEl,
  handleMenuClose,
  handleMenuOpen,
  handleDelete,
  handleEdit,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const { palette } = useTheme();

  const { _id, friends } = user;

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const neutralLight = palette.neutral.light;

  const isFriend = friends?.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await addRemoveFriend({ userId: _id, token, friendId });

    dispatch(setFriends(response.data));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <AvatarUser picture={userPicture} size={sizePicture} />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant={sizeName}
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{
            backgroundColor: isFriend ? neutralLight : primaryLight,
            p: "0.6rem",
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined
              sx={{ color: primaryDark, fontSize: sizeIcon }}
            />
          ) : (
            <PersonAddOutlined
              sx={{ color: primaryDark, fontSize: sizeIcon }}
            />
          )}
        </IconButton>
      )}

      {_id === friendId && isPosts && (
        <MoreAction
          anchorEl={anchorEl}
          handleMenuOpen={handleMenuOpen}
          handleMenuClose={handleMenuClose}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </FlexBetween>
  );
};

export default Friend;

Friend.propTypes = {
  friendId: string,
  name: string,
  subtitle: string,
  userPicture: string,
  sizePicture: string,
  sizeIcon: string,
  sizeName: string,
};

Friend.defaultProps = {
  friendId: "",
  name: "",
  subtitle: "",
  userPicture: "",
  sizePicture: "55px",
  sizeIcon: "medium",
  sizeName: "h5",
};
