import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../../components/Navbar";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import { useDispatch, useSelector } from "react-redux";
import {
  AdvertWidget,
  FriendListWidget,
  PostCreator,
  PostsWidget,
  SearchFriendWidget,
  UserWidget,
} from "../../components";
import { setPosts } from "../../state/slices/postsSlice";
import { useEffect } from "react";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);
  const { _id } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

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
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostCreator />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <FriendListWidget userId={_id} />
            <Box m="2rem 0" />
            <SearchFriendWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
