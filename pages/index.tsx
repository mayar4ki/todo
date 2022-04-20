import type { NextPage } from "next";
import Head from "next/head";
import { _TodoService } from "@services";
import { Archive,  Doing, Done, Todo } from "@components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { selectTodos, SetTodos } from "redux/Slices/TodosSlice";
import { useQuery } from "react-query";

const Home: NextPage = () => {
  const Todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const { isLoading, isError, data, error } = useQuery(
    "todos",
    _TodoService.Index,
    { onSuccess: (data) => dispatch(SetTodos(data.data)) }
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Head>
          <title> TODO LIST </title>
          <meta name="description" content="a good todo list" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* flex flex-row items-start justify-between
        px-5 space-x-10 */}
        <div
          className=" flex flex-col items-center space-y-7 md:flex md:flex-row md:flex-wrap md:space-x-4 
          xl:flex xl:felx-row xl:flex-nowrap xl:px-5 xl:items-start xl:space-x-10
          "
        >
          <Todo todos={Todos.filter((t) => t.status == "todo")} Loading={isLoading} />
          <Done todos={Todos.filter((t) => t.status == "done")} Loading={isLoading} />
          <Doing todos={Todos.filter((t) => t.status == "doing")} Loading={isLoading} />
          <Archive todos={Todos.filter((t) => t.status == "archive")} Loading={isLoading} />

        </div>
      </div>

      <div>
      </div>
    </DndProvider>
  );
};

export default Home;
