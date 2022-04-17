import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../interfaces/interface";
import { RootState } from "../store";


export interface TodosState {
  Todos: Todo[];
  status: 'idle' | 'loading' | 'failed';  
}

const initialState:TodosState={
  Todos: [],
  status: 'idle'
};

export const TodosSlice = createSlice({
    name: 'Todos',
    initialState,
    reducers: {

        AddTodo: (state, action: PayloadAction<Todo>) => {
        state.Todos.push(action.payload)
      },

      DeleteTodo: (state, action: PayloadAction<Todo>) => {
        state.Todos=state.Todos.filter(Todo=>Todo._id!==action.payload._id)
      },

      UpdateTodo: (state, action: PayloadAction<Todo>) => {
        state.Todos=state.Todos.map(Todo=>Todo._id==action.payload._id?action.payload:Todo)
      },

      SetTodos:(state, action: PayloadAction<Todo[]>)=>{
        state.Todos=action.payload
      }
    },
  });


  export const selectTodos = (state: RootState) => state.Todos.Todos;

  export const { AddTodo, DeleteTodo, UpdateTodo,SetTodos } = TodosSlice.actions;

  export default TodosSlice.reducer;


