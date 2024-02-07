export const formattedFriendsFunction = (friends) =>
  friends.map(({ _id, firstName, lastName, occupation, location, picture }) => {
    return {
      _id,
      firstName,
      lastName,
      occupation,
      location,
      picture,
    };
  });
