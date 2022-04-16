

type status='todo' | 'doing' | 'done' | 'archive';

export interface Todo  {
    _id: string;
    title: string;
    subject: string;
    status:status ;
  };


export interface CreateTodo {
    title: string;
    subject: string;
  };

  export interface UpdateTodo {
    title?: string;
    subject?: string;
    status?: status;
  };