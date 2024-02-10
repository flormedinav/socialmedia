import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputBase, useTheme } from "@mui/material";

import { AvatarUser, FlexBetween, WidgetWrapper, ButtonSend } from "..";
import { setPost } from "../../state/slices/postsSlice";
import { addComment } from "../../services/postsServices";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";

const AddComments = ({ postId }) => {
  const [comment, setComment] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const { _id, picture, firstName, lastName } = user;

  const handleCreateComment = async () => {
    const sendBody = {
      text: "",
    };

    setIsCreating(true);

    sendBody.text = comment;

    const response = await addComment({ userId: _id, postId, token, sendBody });

    dispatch(setPost(response.data));

    clearCommentForm();
    setIsCreating(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateComment();
    }
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const clearCommentForm = () => {
    setComment("");
  };

  return (
    <FlexBetween gap="0.5rem" mt="1.5rem" mb="1.5rem">
      <AvatarUser
        picture={picture}
        firstName={firstName}
        lastName={lastName}
        size={45}
      />
      <InputBase
        placeholder={POSTS_CONSTANTS.POST_CREATOR.PLACEHOLDER}
        onChange={handleChangeComment}
        value={comment}
        sx={{
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: ".25rem .75rem",
          width: "85%",
        }}
        onKeyDown={handleKeyDown}
      />
      <ButtonSend
        disabled={!comment || isCreating}
        isLoading={isCreating}
        onClick={handleCreateComment}
        textButton={POSTS_CONSTANTS.COMMENTS.ADD_COMENT}
      />
    </FlexBetween>
  );
};

export default AddComments;
