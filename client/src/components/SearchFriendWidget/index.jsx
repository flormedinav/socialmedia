import { string } from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  useTheme,
} from "@mui/material";
import { Search } from "@mui/icons-material";

import { WidgetWrapper, Friend, FlexBetween } from "../";
import { getAllUsers } from "../../services/usersServices";
import { FRIENDS_CONSTANTS } from "../../constants/friendsConstants";
import Pagination from "@mui/material/Pagination";

const SearchFriendWidget = ({ allUsers }) => {
  const usersPerPage = 5;

  const { palette } = useTheme();
  const { token } = useSelector((state) => state.auth);
  const { _id } = useSelector((state) => state.user.user);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const filtered = allUsers.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(inputSearch.toLowerCase())
    );

    const slicedUsers = filtered.slice(startIndex, endIndex);

    setFilteredUsers(slicedUsers);
    setTotalPages(Math.ceil(filtered.length / usersPerPage));
  }, [allUsers, inputSearch, currentPage, usersPerPage]);

  const handleSearchChange = (event) => {
    setInputSearch(event.target.value);
    setCurrentPage(1);
  };

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {FRIENDS_CONSTANTS.SEARCH_FRIENDS.TITLE}
      </Typography>

      <FlexBetween
        backgroundColor={palette.neutral.light}
        borderRadius="9px"
        gap="3rem"
        padding="0.1rem 1.5rem"
        mb="1.5rem"
      >
        <InputBase
          placeholder={FRIENDS_CONSTANTS.SEARCH_FRIENDS.PLACEHOLDER_SEARCH}
          value={inputSearch}
          onChange={handleSearchChange}
        />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>

      {filteredUsers.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem" mb="1.5rem">
          {filteredUsers.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicture={friend.picture}
              sizePicture={45}
            />
          ))}
        </Box>
      ) : (
        <>
          {inputSearch !== "" && (
            <Typography
              color={palette.neutral.medium}
              sx={{ mb: "1.5rem", mt: "1.5rem" }}
            >
              {FRIENDS_CONSTANTS.SEARCH_FRIENDS.NO_MATCH}
            </Typography>
          )}
        </>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          variant="outlined"
        />
      </Box>
    </WidgetWrapper>
  );
};

export default SearchFriendWidget;

SearchFriendWidget.prototype = {
  userId: string,
};

SearchFriendWidget.defaultProps = {
  userId: "",
};
