import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageOutlined } from "@mui/icons-material";
import { Divider, Typography, InputBase, useTheme } from "@mui/material";

import {
  FlexBetween,
  WidgetWrapper,
  UploadImage,
  ButtonSend,
  AvatarUser,
} from "..";
import { setPosts } from "../../state/slices/postsSlice";
import { createPost } from "../../services/postsServices";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";
import { createUrlCloudinary } from "../../services/cloudinaryServices";
import { setTotalPosts } from "../../state/slices/userSlice";

const PostCreator = () => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [post, setPost] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const dispatch = useDispatch();
  const { _id, picture, firstName, lastName } = useSelector(
    (state) => state.user.user
  );
  const { token } = useSelector((state) => state.auth);

  const { palette } = useTheme();

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
      const { data } = await createPost({ userId: _id, token, sendBody });

      dispatch(setPosts(data.data));
      dispatch(setTotalPosts(data.totalPosts));

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
          fileName={fileName}
          text={POSTS_CONSTANTS.POST_CREATOR.UPLOAD_PHOTO}
          setFieldValue={setImage}
          setFileName={setFileName}
        />
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={handleClickToggleImageSelection}>
          <ImageOutlined
            sx={{
              color: isImageSelected
                ? palette.primary.main
                : palette.neutral.mediumMain,
            }}
          />
          <Typography
            color={
              isImageSelected
                ? palette.primary.main
                : palette.neutral.mediumMain
            }
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: isImageSelected
                  ? palette.primary.light
                  : palette.neutral.medium,
              },
            }}
          >
            {POSTS_CONSTANTS.POST_CREATOR.ACTIONS.ADD_IMAGE}
          </Typography>
        </FlexBetween>

        <ButtonSend
          disabled={!post || isCreatingPost}
          onClick={handleCreatePost}
          isLoading={isCreatingPost}
          textButton={POSTS_CONSTANTS.POST_CREATOR.BUTTON_CREATE}
        />
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostCreator;
