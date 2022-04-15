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


        Index(): AxiosObservable<any> {
            return Axios.get<any>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}`);
        }
        
        Show(id:string): AxiosObservable<any> {  
              return  Axios.get<any>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}/${id}`);
        }

        Store(data:any): AxiosObservable<any> {
            return Axios.post<any>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}`,data);
        }

        Update(id:number,data:any): AxiosObservable<any> {
            return Axios.put<any>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}/${id}`,data);
        }

        Destroy(id:number): AxiosObservable<any> {
            return Axios.delete<any>(`${NEXT_PUBLIC_PROXY_URL}/${this.ITEM}/${id}`);
        }


}

export const _TodoService=TodoService.Instance;






