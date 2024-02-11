import { useInfiniteQuery } from "@tanstack/react-query";

import { getUserPosts } from "../../services/postsServices";
import { useEffect } from "react";

const useGetUserPosts = ({ userId, token }) => {
  const fetchPage = async (pageParam) => {
    return await getUserPosts({ userId, token, page: pageParam });
  };

  const result = useInfiniteQuery({
    queryKey: ["posts-user", userId],
    queryFn: ({ pageParam }) => fetchPage(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (
        !lastPage.pageInfo ||
        Number(lastPage.pageInfo.currentPage) === lastPage.pageInfo.totalPages
      ) {
        return null;
      }

      return Number(lastPage.pageInfo.currentPage) + 1;
    },
  });

  const userPostsData =
    result.data?.pages?.reduce(
      (prevPosts, page) => prevPosts.concat(page.data),
      []
    ) ?? [];

  useEffect(() => {
    result.refetch();
  }, [userId]);

  return { ...result, userPostsData };
};

export default useGetUserPosts;
