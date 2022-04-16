import { CreateTodo, Todo, UpdateTodo } from "@interfaces";
import axios from "axios";

const  {NEXT_PUBLIC_PROXY_URL} =process.env


class TodoService {
    
    private static _instance: TodoService;

    private constructor()
    {
        //...
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }


        Index() {
            return axios.get<Todo[]>(`${NEXT_PUBLIC_PROXY_URL}/todos`);
        }
        
        Show(id:string) {  
              return  axios.get<Todo>(`${NEXT_PUBLIC_PROXY_URL}/todos/${id}`);
        }

        Store(data:CreateTodo) {
            return axios.post<Todo>(`${NEXT_PUBLIC_PROXY_URL}/todos`,data);
        }

        Update(id:string,data:UpdateTodo) {
            return axios.put<Todo>(`${NEXT_PUBLIC_PROXY_URL}/todos/${id}`,data);
        }

        Destroy(id:string) {
            return axios.delete<Todo>(`${NEXT_PUBLIC_PROXY_URL}/todos/${id}`);
        }


}

export const _TodoService=TodoService.Instance;






