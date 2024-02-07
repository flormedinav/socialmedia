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
  AddComments,
  AvatarUser,
} from "../";
import { setPost } from "../../state/slices/postsSlice";
import { likePost } from "../../services/postsServices";

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
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const loggedInUserId = useSelector((state) => state.user.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await likePost({ userId: loggedInUserId, postId, token });

    dispatch(setPost(response.data));
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
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <>
          <AddComments postId={postId} />
          {comments && comments.length !== 0 && (
            <Box
              mt="0.5rem"
              display="flex"
              flexDirection="column"
              gap="1rem"
              mb="1.5rem"
            >
              {comments.map((comment, i) => (
                <Box key={comment._id}>
                  <Divider
                    sx={{
                      mb: "1rem",
                    }}
                  />
                  <Box display="flex" gap="1rem">
                    <AvatarUser picture={comment.user.picture} size="30px" />
                    <Box display="flex" flexDirection="column" gap="0.5rem">
                      <Typography
                        variant="body1"
                        onClick={() => {
                          navigate(`/profile/${comment.user._id}`);
                          navigate(0);
                        }}
                      >{`${comment.user.firstName} ${comment.user.lastName}`}</Typography>
                      <Typography variant="body2" sx={{ color: main }}>
                        {`${comment.text}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
