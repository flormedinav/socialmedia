import { string, shape, bool } from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { AvatarUser, ModalDelete, MoreAction } from "../";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import { deleteComment, editComment } from "../../services/postsServices";
import { setPost } from "../../state/slices/postsSlice";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";
import { CommentPropTypes } from "../../propTypes/CommentPropTypes";

const CommentItem = ({ postId, comment }) => {
  const navigate = useNavigate();
  const isMoreMedia350 = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[350]);
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const { palette } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedComment, setUpdatedComment] = useState(comment.text);
  const [isEdit, setIsEdit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEdit(true);
    handleMenuClose();
  };

  const handleChangeEdit = (e) => {
    setUpdatedComment(e.target.value);
  };

  const handleClickCancelEdit = () => {
    setIsEdit(false);
  };

  const fetchEditComment = async () => {
    setIsFetching(true);
    const sendBody = {
      text: updatedComment,
    };

    const response = await editComment({
      userId: user._id,
      token,
      postId,
      commentId: comment._id,
      sendBody,
    });

    dispatch(setPost(response.data));
    setIsEdit(false);
    setIsFetching(false);
  };

  const handleKeyDownEdit = (event) => {
    if (event.key === "Enter") {
      fetchEditComment();
    }
  };

  const handleDelete = () => {
    setOpenModal(true);
    handleMenuClose();
  };

  const handleClickDeleteCancel = () => {
    setOpenModal(false);
  };

  const fetchDeleteComment = async () => {
    setIsFetching(true);

    const response = await deleteComment({
      userId: user._id,
      token,
      postId,
      commentId: comment._id,
    });

    dispatch(setPost(response.data));
    setOpenModal(false);
    setIsFetching(false);
  };

  return (
    <Box key={comment._id}>
      <Divider
        sx={{
          mb: "1rem",
        }}
      />
      <Box display="flex" gap="1rem">
        <AvatarUser picture={comment.user.picture} size={30} />
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          sx={{
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body1"
              onClick={() => {
                navigate(`/profile/${comment.user._id}`);
                navigate(0);
              }}
              sx={{
                cursor: "pointer",
              }}
            >{`${comment.user.firstName} ${comment.user.lastName}`}</Typography>

            {user._id === comment.user._id && (
              <MoreAction
                handleMenuOpen={handleMenuOpen}
                handleMenuClose={handleMenuClose}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                anchorEl={anchorEl}
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              justifyContent: "space-between",
              gap: "0.5rem",
            }}
          >
            {isEdit ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <TextField
                  variant="outlined"
                  size="small"
                  value={updatedComment}
                  onChange={handleChangeEdit}
                  onKeyDown={handleKeyDownEdit}
                />
                <IconButton
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={handleClickCancelEdit}
                  disabled={isFetching}
                >
                  <CloseIcon
                    sx={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </IconButton>

                <IconButton
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                  onClick={fetchEditComment}
                  disabled={isFetching}
                >
                  <CheckIcon
                    sx={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                </IconButton>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: palette.neutral.main,
                  maxWidth: isMoreMedia350
                    ? {
                        xs: "200px",
                        sm: "350px",
                        md: "500px",
                        lg: "300px",
                      }
                    : "150px !important",

                  overflowWrap: "break-word",
                }}
              >
                {`${comment.text}`}
              </Typography>
            )}

            {comment.isEdited && (
              <Typography
                variant="body2"
                sx={{ color: palette.neutral.mediumLight1 }}
              >
                {`(Editado)`}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <ModalDelete
        open={openModal}
        textCancel={POSTS_CONSTANTS.COMMENTS.MODAL_DELETE.BUTTON.CANCEL}
        textConfirm={POSTS_CONSTANTS.COMMENTS.MODAL_DELETE.BUTTON.CONFIRM}
        subtitle={POSTS_CONSTANTS.COMMENTS.MODAL_DELETE.SUBTITLE}
        title={POSTS_CONSTANTS.COMMENTS.MODAL_DELETE.TITLE}
        handleCancel={handleClickDeleteCancel}
        handleConfirm={fetchDeleteComment}
        confirmLoading={isFetching}
      />
    </Box>
  );
};

export default CommentItem;

CommentItem.propTypes = {
  postId: string.isRequired,
  comment: CommentPropTypes,
};
