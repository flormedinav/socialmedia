import { Box } from "@mui/material";

import { AddComments, CommentItem } from "../";

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
            <CommentItem comment={comment} postId={postId} />
          ))}
        </Box>
      )}
    </>
  );
};

export default Comments;
