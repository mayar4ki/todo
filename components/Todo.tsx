import { AddSvg } from "@svgs";
import styles from "styles/Todo.module.scss";
import { Task } from "@components";
import { useDrop } from "react-dnd";
import { DroppelNames } from "@constants";
import { CreateTodo, Todo as todo } from "@interfaces";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { _TodoService } from "@services";
import { useMutation } from "react-query";
import { useAppDispatch } from "redux/hooks";
import { AddTodo } from "redux/Slices/TodosSlice";
import CircularProgress from '@mui/material/CircularProgress';


const schema = yup
  .object({
    title: yup.string().required(),
    subject: yup.string().required(),
  })
  .required();

export const Todo = ({ todos }: { todos: todo[] }) => {

  const dispatch = useAppDispatch();

  const createTodo = async (data: CreateTodo) => {
    const response = await _TodoService.Store(data);
    return response.data;
  };

  const { mutate, isLoading } = useMutation(createTodo, {
    onSuccess: (data) => {reset();handleClose();dispatch(AddTodo(data))},
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodo>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CreateTodo) => mutate(data);

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
          <Dialog
            open={open}
            onClose={handleClose}
            BackdropProps={{
              style: {
                backgroundColor: "#ffffff70",
                backdropFilter: "blur(1px)",
                padding: "39px",
              },
            }}
          >
            <DialogTitle>Add a New Task</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogContent>
                <input
                  {...register("title")}
                  placeholder="title"
                  className={`${styles.title_input} ${
                    errors.title ? " border border-red-500 " : ""
                  }`}
                  type="text"
                />
                <p className=" my-1 text-red-500 ">{errors.title?.message}</p>

                <textarea
                  {...register("subject")}
                  placeholder="subject"
                  className={`${styles.title_input} ${
                    errors.subject ? " border border-red-500 " : ""
                  } `}
                  rows={5}
                />
                <p className=" my-1 text-red-500 ">{errors.subject?.message}</p>
              </DialogContent>
              <DialogActions>
                {isLoading?<CircularProgress />:(
    <button type="submit" className={styles.dialog_add_button}>
    Add
  </button>
                )}
              </DialogActions>
            </form>


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
