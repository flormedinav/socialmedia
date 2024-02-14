import { bool, arrayOf, number, string, func } from "prop-types";
import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";

import { PostWidget } from "..";
import { PostPropType } from "../../propTypes/PostsPropTypes";
import { POSTS_CONSTANTS } from "../../constants/postsConstants";

const PostsWidget = ({
  posts,
  loading,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const { palette } = useTheme();

  return (
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
          {posts && posts.length !== 0 ? (
            <>
              {posts?.map(
                (
                  { _id, user, description, picture, likes, comments },
                  index
                ) => (
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => {
                    return setCurrentPage(page);
                  }}
                  variant="outlined"
                />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="body1" color={palette.neutral.medium}>
                {POSTS_CONSTANTS.POSTS.NOT_POSTS}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default PostsWidget;

PostsWidget.propTypes = {
  posts: arrayOf(PostPropType),
  loading: bool,
  totalPages: number,
  currentPage: string,
  setCurrentPage: func,
};

PostsWidget.defaultProps = {
  posts: null,
  loading: false,
  totalPages: 0,
  currentPage: "1",
  setCurrentPage: () => {},
};
