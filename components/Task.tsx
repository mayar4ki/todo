import { useState } from "react";
import { EditSvg, TrashSvg } from "@svgs";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "styles/Task.module.scss";
import { Todo } from "@interfaces";

export const Task = ({ todo }: { todo: Todo }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.todo}>
      <div className={styles.todo_Content}>
        {todo.title}
      </div>
      <div>
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{ "aria-labelledby": "long-button" }}
          PaperProps={{
            style: {
              width: "12ch",
              borderRadius: "11px",
            },
          }}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <div className=" w-full flex flex-row justify-between ">
              {" "}
              Edit <EditSvg />
            </div>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            disableRipple
            className=" justify-between"
          >
            <div className=" w-full flex flex-row justify-between ">
              {" "}
              Delete <TrashSvg />
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};
