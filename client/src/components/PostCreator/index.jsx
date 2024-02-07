import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageOutlined } from "@mui/icons-material";
import {
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  CircularProgress,
} from "@mui/material";

import { FlexBetween, WidgetWrapper, UploadImage } from "..";
import { setPosts } from "../../state/slices/postsSlice";
import { TYPE_THEMES } from "../../constants/global";
import { createPost } from "../../services/postsServices";
import AvatarUser from "../AvatarUser";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";
import { createUrlCloudinary } from "../../services/cloudinaryServices";
import { colorTokens } from "../../theme";

const PostCreator = () => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [post, setPost] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const { palette } = useTheme();

  const dispatch = useDispatch();
  const { _id, picture, firstName, lastName } = useSelector(
    (state) => state.user.user
  );
  const { token } = useSelector((state) => state.auth);

  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handleCreatePost = async () => {
    const sendBody = {
      description: "",
      picture: "",
    };

    setIsCreatingPost(true);

    try {
      sendBody.description = post;

      if (image) {
        const responsePicture = await createUrlCloudinary(image);
        sendBody.picture = responsePicture.data.secure_url;
      }
      const response = await createPost({ userId: _id, token, sendBody });

      dispatch(setPosts(response.data));
      clearPostForm();
    } catch (error) {
      console.error("Error creating post: ", error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleChangePostContent = (e) => {
    setPost(e.target.value);
  };

  const handleClickToggleImageSelection = () => {
    setIsImageSelected(!isImageSelected);
    if (image) {
      setImage(null);
    }
    if (fileName) {
      setFileName("");
    }
  };

  const clearPostForm = () => {
    setImage(null);
    setIsImageSelected(false);
    setFileName("");
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <AvatarUser
          picture={picture}
          firstName={firstName}
          lastName={lastName}
          size={60}
        />
        <InputBase
          placeholder={POSTS_CONSTANTS.POST_CREATOR.PLACEHOLDER}
          onChange={handleChangePostContent}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImageSelected && (
        <UploadImage
          setFieldValue={setImage}
          fileName={fileName}
          setFileName={setFileName}
        />
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={handleClickToggleImageSelection}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            {POSTS_CONSTANTS.POST_CREATOR.ACTIONS.ADD_IMAGE}
          </Typography>
        </FlexBetween>

        <Button
          disabled={!post || isCreatingPost}
          onClick={handleCreatePost}
          sx={{
            color: colorTokens.grey[10],
            backgroundColor: isCreatingPost
              ? palette.neutral.light
              : palette.primary.main,
            borderRadius: "3rem",
            p: "8px 16px",
            "&:hover": {
              backgroundColor: colorTokens.primary[600],
              color: colorTokens.grey[10],
            },
            "&.Mui-disabled": {
              color:
                palette.mode === TYPE_THEMES.LIGHT
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(255, 255, 255, 0.2)",
              backgroundColor: palette.neutral.light,
            },
          }}
        >
          {isCreatingPost ? (
            <CircularProgress size={20} />
          ) : (
            POSTS_CONSTANTS.POST_CREATOR.BUTTON_CREATE
          )}
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostCreator;
