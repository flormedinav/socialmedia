import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import {
  FriendListWidget,
  PostCreator,
  PostsWidget,
  SearchFriendWidget,
  UserWidget,
} from "../../components";

import { getFeedPosts } from "../../services/postsServices";
import { setPosts } from "../../state/slices/postsSlice";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);

  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const fetchPage = async () => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const response = await getFeedPosts({
      userId: user._id,
      token,
      page: currentPage,
    });

    dispatch(setPosts(response.data));
    setTotalPages(response.pageInfo.totalPages);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPage();
  }, [currentPage, user.friends]);

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
        <UserWidget userId={user._id} user={user} />
      </Box>
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <PostCreator />
        <Box m="2rem 0" />
        <PostsWidget
          loading={isLoading}
          posts={posts}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <FriendListWidget friends={user.friends} userId={user._id} />
          <Box m="2rem 0" />
          <SearchFriendWidget userId={user._id} />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
