import { string, arrayOf } from "prop-types";
import { Box } from "@mui/material";

import { AddComments, CommentItem } from "../";
import { CommentPropTypes } from "../../propTypes/CommentPropTypes";

const Comments = ({ postId, comments }) => {
  return (
    <>
      <AddComments postId={postId} />
      {comments && comments?.length !== 0 && (
        <Box
          mt="0.5rem"
          display="flex"
          flexDirection="column"
          gap="1rem"
          mb="1.5rem"
        >
          {comments.map((comment) => (
            <CommentItem comment={comment} postId={postId} key={comment._id} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Comments;

Comments.propTypes = {
  postId: string.isRequired,
  comment: arrayOf(CommentPropTypes),
};

Comments.defaultProps = {
  comment: null,
};
