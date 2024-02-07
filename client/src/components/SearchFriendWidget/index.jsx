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

const SearchFriendWidget = ({ userId }) => {
  const { palette } = useTheme();
  const { token } = useSelector((state) => state.auth);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getAllUsers({ userId, token });
      setAllUsers(response.data);
    };

    fetchAllUsers();
  }, [userId, token]);

  useEffect(() => {
    const filtered = allUsers.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(inputSearch.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [allUsers, inputSearch]);

  const handleSearchChange = (event) => {
    setInputSearch(event.target.value);
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
              sizePicture="45px"
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
    </WidgetWrapper>
  );
};

export default SearchFriendWidget;
