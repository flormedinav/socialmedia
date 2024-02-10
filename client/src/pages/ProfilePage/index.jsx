import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Navbar,
  FriendListWidget,
  PostsWidget,
  PostCreator,
  UserWidget,
} from "../../components";
import { getUser, getUserFriends } from "../../services/usersServices";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import { setPosts } from "../../state/slices/postsSlice";
import { getUserPosts } from "../../services/postsServices";

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [postsData, userData] = await Promise.all([
        getUserPosts({ userId, token }),
        getUser({ userId, token }),
      ]);

      dispatch(setPosts(postsData.data));
      setUser(userData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar isNavigate />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget user={user} userId={userId} />
          <Box m="2rem 0" />
          <FriendListWidget friends={user.friends} userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostCreator picturePath={user.picture} />
          <Box m="2rem 0" />
          <PostsWidget posts={posts} loading={loading} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
