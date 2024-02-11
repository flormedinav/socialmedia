import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getFeedPosts } from "../../services/postsServices";

const useGetFeedPosts = ({ userId, token, userFriends }) => {
  const fetchPage = async (pageParam) => {
    return await getFeedPosts({ userId, token, page: pageParam });
  };

  const result = useInfiniteQuery({
    queryKey: ["posts-feed"],
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

  const postsData =
    result.data?.pages?.reduce(
      (prevPosts, page) => prevPosts.concat(page.data),
      []
    ) ?? [];

  useEffect(() => {
    result.refetch();
  }, [userFriends]);

  return { ...result, postsData };
};

export default useGetFeedPosts;
