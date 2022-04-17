import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TrashSvg } from '@svgs';
import { useAppDispatch } from 'redux/hooks';
import { _TodoService } from '@services';
import { useMutation } from 'react-query';
import { DeleteTodo } from 'redux/Slices/TodosSlice';
import styles from 'styles/TaskDelete.module.scss'
import CircularProgress from '@mui/material/CircularProgress';


export const TaskDelete = (props:{_id:string,done:Function}) => {
    const [open, setOpen] = useState(false);

    const handleClose=()=>{setOpen(false); props.done();}
    const handleOpen=()=>setOpen(true);
    
    const dispatch = useAppDispatch();

    const deleteTodo = async (id: string) => {
      const response = await _TodoService.Destroy(id);
      return response.data;
    };
  
    const { mutate, isLoading } = useMutation(deleteTodo, {
      onSuccess: (data) =>{dispatch(DeleteTodo(data));handleClose();}
    });

    const onSubmit = (_id:string) => mutate(_id);

    
  return (
    <>
          <div onClick={()=>handleOpen()}  className=" w-full flex flex-row justify-between ">
            
            Delete <TrashSvg />
          </div>

        <Dialog
        open={open}
        keepMounted
        BackdropProps={{
          style: {
            backgroundColor: "#ffffff70",
            backdropFilter: "blur(1px)",
            padding: "39px",
          },
        }}
      >
        <DialogTitle >
         Task Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
          Are you sure about that??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className={styles.dialog_cancel_button} onClick={handleClose} >Cancel</button>
          {isLoading?<CircularProgress className=' ml-5'></CircularProgress>:(
 <button className={styles.dialog_yes_button}  onClick={()=>{
    onSubmit(props._id);
 
}} autoFocus>
  Yes
</button>
          )}
           
        </DialogActions>
      </Dialog>
    </>
  )
}
