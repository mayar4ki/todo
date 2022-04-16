import { CreateTodo, Todo, UpdateTodo } from "@interfaces";
import Axios, { AxiosObservable } from "axios-observable";

const  {NEXT_PUBLIC_PROXY_URL} =process.env


class TodoService {
    
    private static _instance: TodoService;
    private readonly ITEM='todos';

    private constructor()
    {
        //...
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }


        Index(): AxiosObservable<Todo[]> {
            return Axios.get<Todo[]>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}`);
        }
        
        Show(id:string): AxiosObservable<Todo> {  
              return  Axios.get<Todo>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}/${id}`);
        }

        Store(data:CreateTodo): AxiosObservable<Todo> {
            return Axios.post<Todo>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}`,data);
        }

        Update(id:string,data:UpdateTodo): AxiosObservable<Todo> {
            return Axios.put<Todo>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}/${id}`,data);
        }

        Destroy(id:string): AxiosObservable<Todo> {
            return Axios.delete<Todo>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}/${id}`);
        }


}

export const _TodoService=TodoService.Instance;






