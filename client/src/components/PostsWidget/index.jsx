import { bool, arrayOf } from "prop-types";
import { Box, CircularProgress } from "@mui/material";

import { PostWidget } from "..";
import { PostPropType } from "../../propTypes/PostsPropTypes";

const PostsWidget = ({ posts, loading }) => (
  <>
    {loading ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "4rem",
        }}
      >
        <CircularProgress />
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {posts?.map(
          ({ _id, user, description, picture, likes, comments }, index) => (
            <PostWidget
              key={`${_id}-${index}`}
              postId={_id}
              postUserId={user._id}
              name={`${user.firstName} ${user.lastName}`}
              description={description}
              picture={picture}
              userPicture={user.picture}
              locationUser={user.loccation}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </Box>
    )}
  </>
);

export default PostsWidget;

PostsWidget.propTypes = {
  posts: arrayOf(PostPropType),
  loading: bool,
};

PostsWidget.defaultProps = {
  posts: null,
  loading: false,
};
