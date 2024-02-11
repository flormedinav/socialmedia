import { shape, string, arrayOf } from "prop-types";

export const FriendsPropTypes = shape({
  _id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  picture: string,
  location: string,
  occupation: string,
});

export const UserPropTypes = shape({
  _id: string.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  email: string,
  picture: string,
  location: string,
  occupation: string,
  friends: arrayOf(FriendsPropTypes),
  createdAt: string,
  updatedAt: string,
});
