import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Navbar,
  FriendListWidget,
  PostsWidget,
  UserWidget,
} from "../../components";

import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";

import { useEffect, useState } from "react";
import { getUserPosts } from "../../services/postsServices";
import { getUser } from "../../services/usersServices";
import { setPosts } from "../../state/slices/postsSlice";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userProfile, setUserProfile] = useState(null);

  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);

  const { userId } = useParams();

  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);

  const fetchPage = async () => {
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const dataPosts = await getUserPosts({
      userId,
      token,
      page: currentPage,
    });

    const dataUser = await getUser({ userId, token });

    dispatch(setPosts(dataPosts.data));

    setUserProfile(dataUser.data);
    setTotalPages(dataPosts.pageInfo.totalPages);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPage();
  }, [currentPage, userId]);

  return (
    <Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "4rem",
            minHeight: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && userProfile && (
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="2rem"
          justifyContent="center"
        >
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget user={userProfile} userId={userId} />
            <Box m="2rem 0" />
            <FriendListWidget
              isLoading={isLoading}
              friends={userProfile?.friends}
              userId={userId}
            />
          </Box>
          <Box
            flexBasis={isNonMobileScreens ? "42%" : undefined}
            mt={isNonMobileScreens ? undefined : "2rem"}
          >
            {/* <PostCreator picturePath={userData.picture} /> */}
            <PostsWidget
              posts={posts}
              loading={isLoading}
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
