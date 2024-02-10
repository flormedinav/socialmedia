import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import {
  FlexBetween,
  WidgetWrapper,
  Friend,
  Comments,
} from "../";
import { setPost } from "../../state/slices/postsSlice";
import { likePost } from "../../services/postsServices";
import { setTotalLikes } from "../../state/slices/userSlice";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  picture,
  userPicture,
  likes,
  comments,
  locationUser,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const loggedInUserId = useSelector((state) => state.user.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes)?.length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const { data } = await likePost({ userId: loggedInUserId, postId, token });

    dispatch(setPost(data.data));
    dispatch(setTotalLikes(data.totalLikes));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={locationUser}
        userPicture={userPicture}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picture && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picture}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton
              onClick={() => setIsComments(!isComments)}
              sx={{
                backgroundColor: isComments ? palette.neutral.light : "fff",
              }}
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && <Comments postId={postId} comments={comments} />}
    </WidgetWrapper>
  );
};

export default PostWidget;
