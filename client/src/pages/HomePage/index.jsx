import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import {
  AdvertWidget,
  FriendListWidget,
  PostCreator,
  PostsWidget,
  SearchFriendWidget,
  UserWidget,
} from "../../components";
import { setPosts } from "../../state/slices/postsSlice";
import { getFeedPosts } from "../../services/postsServices";
import { setFriends } from "../../state/slices/userSlice";
import { getUserFriends } from "../../services/usersServices";

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsData] = await Promise.all([
        getFeedPosts({ userId: user._id, token }),
      ]);

      dispatch(setPosts(postsData.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log({ user }, "en home");
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Navbar isNavigate />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} user={user} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostCreator />
          <PostsWidget loading={loading} posts={posts} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <FriendListWidget friends={user.friends} userId={user._id} />
            <Box m="2rem 0" />
            <SearchFriendWidget userId={user._id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
