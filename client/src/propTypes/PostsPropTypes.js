import { shape, string, arrayOf, objectOf, bool } from "prop-types";

import { UserPropTypes } from "./UserPropTypes";
import { CommentPropTypes } from "./CommentPropTypes";

export const PostPropType = shape({
  _id: string.isRequired,
  user: UserPropTypes,
  picture: string,
  comments: arrayOf(CommentPropTypes),
  likes: objectOf(bool),
});
