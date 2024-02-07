import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "../../state/slices/postsSlice";
import { getFeedPosts, getUserPosts } from "../../services/postsServices";
import { PostWidget } from "..";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.user);

  const { friends } = user;

  const feedPosts = async () => {
    const response = await getFeedPosts({ userId, token });

    dispatch(setPosts(response.data));
  };

  const userPosts = async () => {
    const response = await getUserPosts({ userId, token });
    dispatch(setPosts(response.data));
  };

  useEffect(() => {
    if (!isProfile) {
      feedPosts();
    } else {
      userPosts();
    }

    return () => {
      dispatch(setPosts([]));
    };
  }, []);

  useEffect(() => {
    if (!isProfile) {
      feedPosts();
    }
  }, [friends]);

  return (
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
  );
};

export default PostsWidget;
