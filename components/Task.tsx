import { useState } from "react";
import { useDrag } from 'react-dnd'
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styles from "styles/Task.module.scss";
import { Todo, UpdateTodo } from "@interfaces";
import Link from "next/link";
import { TaskDelete,TaskEdit } from "@components";
import { _TodoService } from "@services";
import { useAppDispatch } from "redux/hooks";
import { UpdateTodo as _UpdateTodo } from "redux/Slices/TodosSlice";
import { useMutation } from "react-query";
import CircularProgress from '@mui/material/CircularProgress';


export const Task = ({ todo }: { todo: Todo }) => {

  const dispatch = useAppDispatch();

  type dropResultName='TODO'|'DOING'|'DONE'|'ARCHIVE';

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { todo },
    end: (item, monitor) => {
      const dropResult:any = monitor.getDropResult()
      if (item && dropResult) {
        TodoStateUpdate(dropResult.name)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const TodoStateUpdate=(name:dropResultName)=>{
switch (name) {
  case 'TODO':
  mutate({status:'todo'});
  //dispatch(_UpdateTodo({...todo,status:'todo'}))
    break;

    case 'DOING':
    mutate({status:'doing'});
    //dispatch(_UpdateTodo({...todo,status:'doing'}))
      break;

      case 'DONE':
      mutate({status:'done'});
      //dispatch(_UpdateTodo({...todo,status:'done'}))
        break;

        case 'ARCHIVE':
        mutate({status:'archive'});
        //dispatch(_UpdateTodo({...todo,status:'archive'}))
          break;

  default:

    break;
}



  }

  const updateTodo = async (data:UpdateTodo) => {
    const response = await _TodoService.Update(todo._id,data);
    return response.data;
  };

  const { mutate, isLoading } = useMutation(updateTodo, {
    onSuccess: (data) =>{ dispatch(_UpdateTodo(data));}
  });


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

    <div className={`${styles.task}  ${isDragging?' opacity-70':''}  `} ref={drag}  >
      <div className={styles.task_title}>
     {isLoading?<CircularProgress />:(<Link href='/todo/[id]' as={`/todo/${todo._id}`}>
  {todo.title}
  </Link>)} 
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
