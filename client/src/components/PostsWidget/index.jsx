import { shape, bool } from "prop-types";
import { Box, CircularProgress } from "@mui/material";

import { PostWidget } from "..";

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
      <>
        {posts?.map(({ _id, user, description, picture, likes, comments }) => (
          <PostWidget
            key={_id}
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
        ))}
      </>
    )}
  </>
);

export default PostsWidget;

PostsWidget.propTypes = {
  posts: shape({}),
  loading: bool,
};

PostsWidget.defaultProps = {
  posts: null,
  loading: false,
};
