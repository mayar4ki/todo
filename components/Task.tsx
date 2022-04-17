import { useState } from "react";
import { EditSvg } from "@svgs";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "styles/Task.module.scss";
import { Todo } from "@interfaces";
import Link from "next/link";
import { TaskDelete,TaskEdit } from "@components";
import { _TodoService } from "@services";

export const Task = ({ todo }: { todo: Todo }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); ShowIt();
  };

  const handleClose = () => setAnchorEl(null);
  
  const [hidden, sethidden] = useState(false)
  const HideIt=()=>sethidden(true)
  const ShowIt=()=>sethidden(false)

  
 

  return (
    <div className={styles.task}>
      <div className={styles.task_title}>
      <Link href='/todo/[id]' as={`/todo/${todo._id}`}>
  {todo.title}
  </Link>
      </div>
      <div>
        <IconButton
          id="basic-button"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu className={`${hidden?' hidden':''}`}
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
          <MenuItem onClick={HideIt} disableRipple>
            <TaskEdit todo={todo} done={()=>handleClose()}></TaskEdit>
          </MenuItem>

          <MenuItem onClick={HideIt} disableRipple >
          <TaskDelete _id={todo._id} done={()=>handleClose()} ></TaskDelete>
          </MenuItem>

        </Menu>
      </div>
      
    </div>
  );
};
