import type { NextPage } from "next";
import Head from "next/head";
import { _TodoService } from "@services";
import styles from "styles/Home.module.scss";
import { Archive, Box, Doing, Done, Todo } from "@components";
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
      <div className=" pt-28">
        <Head>
          <title> TODO LIST </title>
          <meta name="description" content="a good todo list" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1 className={`${styles.todoTitle} w-full text-center pb-10 `}>
          TODO LIST
        </h1>

        <div
          className="
      flex flex-row items-start justify-between
        px-5 space-x-10"
        >
          <Todo todos={Todos.filter((t) => t.status == "todo")} />
          <Done todos={Todos.filter((t) => t.status == "done")} />
          <Doing todos={Todos.filter((t) => t.status == "doing")} />
          <Archive todos={Todos.filter((t) => t.status == "archive")} />
        </div>
      </div>

      <div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <Box name="Glass" />
          <Box name="Banana" />
          <Box name="Paper" />
        </div>
      </div>
    </DndProvider>
  );
};

export default Home;
