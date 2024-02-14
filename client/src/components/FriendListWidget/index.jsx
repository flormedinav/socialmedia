import { arrayOf } from "prop-types";
import { useEffect, useState } from "react";
import { Box, Pagination, Typography, useTheme } from "@mui/material";

import { WidgetWrapper, Friend, FlexBetween } from "../";
import { FRIENDS_CONSTANTS } from "../../constants/friendsConstants";
import { FriendsPropTypes } from "../../propTypes/UserPropTypes";
import usePagination from "../../hooks/usePagination";

const FriendListWidget = ({ friends }) => {
  const usersPerPage = 3;

  const { palette } = useTheme();

  const { currentPage, paginatedData, totalPages, setCurrentPage } =
    usePagination(friends, usersPerPage);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {FRIENDS_CONSTANTS.LIST_FRIENDS.TITLE}
      </Typography>

      {friends && friends?.length !== 0 ? (
        <Box display="flex" flexDirection="column" gap="1.5rem" mb="1.5rem">
          {paginatedData?.map((friend) => (
            <Friend
              key={friend?._id}
              friendId={friend?._id}
              name={`${friend?.firstName} ${friend?.lastName}`}
              subtitle={friend?.occupation}
              userPicture={friend?.picture}
              sizePicture={45}
            />
          ))}
        </Box>
      ) : (
        <Typography
          color={palette.neutral.medium}
          sx={{ mb: "1.5rem", mt: "1.5rem" }}
        >
          {FRIENDS_CONSTANTS.LIST_FRIENDS.NOT_FRIENDS}
        </Typography>
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

export default FriendListWidget;

FriendListWidget.prototype = {
  friends: arrayOf(FriendsPropTypes),
};

FriendListWidget.defaultProps = {
  friends: null,
};
