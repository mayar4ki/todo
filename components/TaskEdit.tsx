import { Todo, UpdateTodo } from '@interfaces'
import { _TodoService } from '@services';
import { EditSvg } from '@svgs'
import styles from 'styles/TaskEdit.module.scss'
import React, { useState } from 'react'
import { useMutation } from 'react-query';
import { useAppDispatch } from 'redux/hooks';
import { UpdateTodo as _UpdateTodo } from 'redux/Slices/TodosSlice';

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from '@mui/material/CircularProgress';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required(),
    subject: yup.string().required(),
  })
  .required();

export const TaskEdit = (props:{todo:Todo,done:Function}) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTodo>({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const handleClose=()=>{setOpen(false); props.done();}
  const handleOpen=()=>setOpen(true);
  
  const dispatch = useAppDispatch();

  const updateTodo = async (data:UpdateTodo) => {
    const response = await _TodoService.Update(props.todo._id,data);
    return response.data;
  };

  const { mutate, isLoading } = useMutation(updateTodo, {
    onSuccess: (data) =>{ console.log(data)
      dispatch(_UpdateTodo(data));handleClose();reset();}
  });

  const onSubmit = (data:UpdateTodo) => mutate(data);
    
  return (
    <>
   <div onClick={()=>handleOpen()}  className=" w-full flex flex-row justify-between ">
              Edit <EditSvg />
            </div>

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
                <input defaultValue={props.todo.title}
                  {...register("title")}
                  placeholder="title"
                  className={`${styles.title_input} ${
                    errors.title ? " border border-red-500 " : ""
                  }`}
                  type="text"
                />
                <p className=" my-1 text-red-500 ">{errors.title?.message}</p>

                <textarea defaultValue={props.todo.subject}
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
    Edit
  </button>
                )}
              </DialogActions>
            </form>


          </Dialog>
    </>
  )
}
