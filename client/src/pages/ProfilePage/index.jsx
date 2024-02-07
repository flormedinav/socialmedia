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
import { getUser } from "../../services/usersServices";
import { MEDIA_QUERY_MIN_WIDTH } from "../../constants/global";
import { setPosts } from "../../state/slices/postsSlice";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const isNonMobileScreens = useMediaQuery(MEDIA_QUERY_MIN_WIDTH[1000]);
  const dispatch = useDispatch();

  const infoUser = async () => {
    const response = await getUser({ userId, token });
    setUser(response.data);
  };

  useEffect(() => {
    infoUser();
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
          <UserWidget userId={userId} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostCreator picturePath={user.picture} />
          <Box m="2rem 0" />
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
