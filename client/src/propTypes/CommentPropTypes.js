import { shape, string, bool } from "prop-types";

import { UserPropTypes } from "./UserPropTypes";

export const CommentPropTypes = shape({
  _id: string.isRequired,
  user: UserPropTypes,
  text: string,
  isEdited: bool,
  email: string,
});
