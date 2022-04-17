import { AddSvg } from "@svgs";
import styles from "styles/Todo.module.scss";
import { Task } from "@components";
import { useDrop } from "react-dnd";
import { DroppelNames } from "@constants";
import { Todo as todo } from "@interfaces";
import { useState } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const Todo = ({ todos }: { todos: todo[] }) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: DroppelNames.TODO }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      role={DroppelNames.TODO}
      className={`${styles.todoSection} ${isActive ? " opacity-70" : ""}`}
    >
      <div className={styles.todoSection_Header}>
        <div>
          <div className={styles.todoSection_name}>TO Do</div>
          <div className={styles.todoSection_name_ex}>
            things that need to be done
          </div>
        </div>

        <div onClick={handleClickOpen} className={styles.todoSection_AddButton}>
          <AddSvg />
        </div>

        <div>
      <Dialog open={open} onClose={handleClose}
            BackdropProps={{ style: { backgroundColor:'#ffffff70' , backdropFilter:'blur(1px)',padding:'39px'} }}
      >
        <DialogTitle>Add a New Task</DialogTitle>
        <DialogContent>
       
        <input placeholder="title" className={styles.title_input} type="text" />
        <textarea  placeholder="subject" className={styles.title_input}  rows={5} />

  
        </DialogContent>
        <DialogActions>
          <button className={styles.dialog_add_button} onClick={handleClose}>Add</button>
        </DialogActions>
      </Dialog>
    </div>



      </div>

      <div className=" flex flex-col">
        {todos.map((T) => {
          return <Task key={T._id} todo={T}></Task>;
        })}
      </div>
    </div>
  );
};
