import { Avatar, useTheme } from "@mui/material";
import { getInitials } from "../../utils/formatedString";

const AvatarUser = ({ picture, size, firstName, lastName }) => {
  const { palette } = useTheme();

  return (
    <>
      {picture ? (
        <Avatar src={picture} sx={{ width: size, height: size }} />
      ) : (
        <Avatar
          sx={{
            width: size,
            height: size,
            bgcolor: palette.primary.light,
            color: palette.neutral.medium,
          }}
        >
          {getInitials(firstName, lastName)}
        </Avatar>
      )}
    </>
  );
};

export default AvatarUser;
