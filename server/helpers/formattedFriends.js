export const formattedFriendsFunction = (friends) =>
  friends.map(
    ({ _id, firstName, lastName, occupation, location, picturePath }) => {
      return {
        _id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      };
    }
  );
