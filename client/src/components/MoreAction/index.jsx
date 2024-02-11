import { func, shape } from "prop-types";

import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const MoreAction = ({
  handleMenuOpen,
  handleMenuClose,
  handleEdit,
  handleDelete,
  anchorEl,
}) => {
  return (
    <>
      <IconButton
        size="small"
        onClick={handleMenuOpen}
        aria-controls="comment-menu"
        aria-haspopup="true"
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>

      <Menu
        id="comment-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
      </Menu>
    </>
  );
};

export default MoreAction;

MoreAction.prototype = {
  handleMenuOpen: func,
  handleMenuClose: func,
  handleEdit: func,
  handleDelete: func,
  anchorEl: shape({}),
};

MoreAction.defaultProps = {
  handleMenuOpen: () => {},
  handleMenuClose: () => {},
  handleEdit: () => {},
  handleDelete: () => {},
  anchorEl: null,
};
