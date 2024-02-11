import { useEffect, useState } from "react";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import Navbar from "../../components/Navbar";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import {
  AdvertWidget,
  FriendListWidget,
  InfiniteScrollBase,
  PostCreator,
  PostsWidget,
  SearchFriendWidget,
  UserWidget,
} from "../../components";

import useGetFeedPosts from "../../hooks/usePosts/useGetFeedPosts";

const HomePage = () => {
  const { user } = useSelector((state) => state.user);

  const { token } = useSelector((state) => state.auth);

  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const { postsData, hasNextPage, fetchNextPage, isLoading } = useGetFeedPosts({
    userId: user._id,
    token,
    userFriends: user.friends,
  });

  return (
    <InfiniteScrollBase
      dataLength={postsData?.dataLength || 0}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    >
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
          <Box m="2rem 0" />
          <PostsWidget loading={isLoading} posts={postsData} />
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
    </InfiniteScrollBase>
  );
};

export default HomePage;
