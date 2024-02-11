import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";

import {
  FlexBetween,
  WidgetWrapper,
  Friend,
  Comments,
  ModalDelete,
  ModalPostEdit,
} from "../";
import { setPost, setPosts } from "../../state/slices/postsSlice";
import { deletePost, editPost, likePost } from "../../services/postsServices";
import { setTotalLikes, setTotalPosts } from "../../state/slices/userSlice";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";
import { createUrlCloudinary } from "../../services/cloudinaryServices";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(description);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(picture);

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const loggedInUserId = useSelector((state) => state.user.user._id);

  const { palette } = useTheme();

  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes)?.length;

  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const { data } = await likePost({ userId: loggedInUserId, postId, token });

    dispatch(setPost(data.data));
    dispatch(setTotalLikes(data.totalLikes));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setOpenModalDelete(true);
    handleMenuClose();
  };

  const handleClickDeleteCancel = () => {
    setOpenModalDelete(false);
  };

  const handleClickDeleteImage = () => {
    setFileName("");
    setImage(null);
    setPreviewImage(null);
  };

  const handleEdit = () => {
    setOpenModalEdit(true);
    handleMenuClose();
  };

  const handleChangeEdit = (e) => {
    setUpdatedPost(e.target.value);
  };

  const handleClickCancelEdit = () => {
    setOpenModalEdit(false);
    setFileName("");
    setImage(null);
    setPreviewImage(picture);
    setUpdatedPost(description);
  };

  const fetchDeletePost = async () => {
    setIsFetching(true);

    const { data } = await deletePost({ userId: postUserId, postId, token });

    dispatch(setPosts(data.data));
    dispatch(setTotalPosts(data.totalPosts));

    setOpenModalDelete(false);
    setIsFetching(false);
  };

  const fetchEditPost = async () => {
    setIsFetching(true);

    const sendBody = {
      description: updatedPost,
      picture: "",
    };

    if (previewImage && !image) {
      sendBody.picture = previewImage;
    }

    if (image) {
      const responsePicture = await createUrlCloudinary(image);
      sendBody.picture = responsePicture.data.secure_url;
    }

    const { data } = await editPost({
      userId: postUserId,
      postId,
      token,
      sendBody,
    });

    dispatch(setPosts(data));

    setOpenModalEdit(false);
    setIsFetching(false);
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={locationUser}
        userPicture={userPicture}
        isPosts
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
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
            <Typography>{comments?.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>

      {isComments && <Comments postId={postId} comments={comments} />}

      {openModalDelete && (
        <ModalDelete
          open={openModalDelete}
          textCancel={POSTS_CONSTANTS.POSTS.BUTTON_MODAL.CANCEL}
          textConfirm={POSTS_CONSTANTS.POSTS.BUTTON_MODAL.CONFIRM}
          subtitle={POSTS_CONSTANTS.POSTS.MODAL_DELETE.SUBTITLE}
          title={POSTS_CONSTANTS.POSTS.MODAL_DELETE.TITLE}
          handleCancel={handleClickDeleteCancel}
          handleConfirm={fetchDeletePost}
          confirmLoading={isFetching}
        />
      )}

      {openModalEdit && (
        <ModalPostEdit
          title={POSTS_CONSTANTS.POSTS.MODAL_EDIT.TITLE}
          textCancel={POSTS_CONSTANTS.POSTS.BUTTON_MODAL.CANCEL}
          textConfirm={POSTS_CONSTANTS.POSTS.BUTTON_MODAL.CONFIRM}
          open={openModalEdit}
          description={updatedPost}
          fileName={fileName}
          previewImage={previewImage}
          handleCancel={handleClickCancelEdit}
          handleConfirm={fetchEditPost}
          handleChangeEdit={handleChangeEdit}
          setImage={setImage}
          setFileName={setFileName}
          setPreviewImage={setPreviewImage}
          handleClickDeleteImage={handleClickDeleteImage}
          disabledButtonConfirm={
            description === updatedPost && picture === previewImage
          }
          confirmLoading={isFetching}
        />
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
