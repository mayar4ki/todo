import Head from "next/head";
import { _TodoService } from "@services";
import { Archive,  Doing, Done, Todo } from "@components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectTodos, SetTodos } from "redux/Slices/TodosSlice";
import { Todo as _Todo} from "@interfaces";
import { useEffect } from "react";


const Home = ({data}:{data:_Todo[]}) => {

  const dispatch = useAppDispatch();
  const Todos = useAppSelector(selectTodos);

useEffect(() => {

  dispatch(SetTodos(data))

  return () => {  }
}, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Head>
          <title> TODO LIST </title>
          <meta name="description" content="a good todo list" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div
          className=" flex flex-col items-center space-y-7 md:flex md:flex-row md:flex-wrap md:space-x-4 
          xl:flex xl:felx-row xl:flex-nowrap xl:px-5 xl:items-start xl:space-x-10
          "
        >
          <Todo todos={Todos.filter((t) => t.status == "todo")}  />
          <Done todos={Todos.filter((t) => t.status == "done")}  />
          <Doing todos={Todos.filter((t) => t.status == "doing")}  />
          <Archive todos={Todos.filter((t) => t.status == "archive")}  />

        </div>
      </div>

      <div>
      </div>
    </DndProvider>
  );
};

export default Home;


export const getStaticProps =async ()=>{

  const {data}=await _TodoService.Index()

  return {
    props:{data},
    revalidate: 10, 
  }

}
