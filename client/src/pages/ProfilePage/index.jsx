import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Navbar,
  FriendListWidget,
  PostsWidget,
  UserWidget,
  InfiniteScrollBase,
} from "../../components";

import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";

import useGetUserPosts from "../../hooks/usePosts/useGetUserPosts";
import useGetUser from "../../hooks/useUser/useGetUser";

const ProfilePage = () => {
  const { token } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const { userPostsData, hasNextPage, fetchNextPage, isLoading } =
    useGetUserPosts({ userId, token });

  const userData = useGetUser({
    userId,
    token,
  });

  if (!userData) return null;

  return (
    <InfiniteScrollBase
      dataLength={userPostsData.length}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    >
      <Navbar isNavigate />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={userData} userId={userId} />
          <Box m="2rem 0" />
          <FriendListWidget friends={userData.friends} userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <PostCreator picturePath={userData.picture} /> */}
          <PostsWidget posts={userPostsData} loading={isLoading} isProfile />
        </Box>
      </Box>
    </InfiniteScrollBase>
  );
};

export default ProfilePage;
