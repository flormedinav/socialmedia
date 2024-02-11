import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../services/usersServices";

const useGetUser = ({ userId, token }) => {
  const fetchUser = async () => {
    return await getUser({ userId, token });
  };

  const result = useQuery({
    queryKey: ["user-data", userId],
    queryFn: () => fetchUser(),
  });

  return result?.data?.data;
};

export default useGetUser;
