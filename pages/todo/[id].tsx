import { Todo } from "@interfaces";
import { _TodoService } from "@services";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/TodoShow.module.scss";

const TodoShow = ({ todo }: { todo: Todo }) => {
  const bg = (): string => {
    switch (todo.status) {
      case "todo":
        return "#F66568";
      case "doing":
        return "#FFC773";
      case "done":
        return "#6BE795";
      case "archive":
        return "#7389FF";
    }

    return "";
  };
  return (
    <div className=" flex flex-col justify-center items-center mb-14">
      <Head>
        <title> {todo.title} </title>
        <meta name="description" content={todo.subject} />
      </Head>

      <div className={styles.todo_Details}>Task Details</div>

      <div className={styles.todo_Container}>
        <div className={styles.title}>Name</div>
        <div className={styles.description}>{todo.title}</div>

        <div className={styles.title}>Subject</div>
        <div className={styles.description}>{todo.subject}</div>

        <div className={styles.title}> Status </div>

        <div className=" flex flex-row">
          <div
            className=" rounded-full"
            style={{ width: 13, height: 13, background: bg() }}
          ></div>
          <div className={`${styles.description} -mt-2 mx-2.5`}>
            {" "}
            {todo.status}
          </div>
        </div>
      </div>

      <div className={styles.backSection}>
        <Link href="/">
          <button className={styles.button}> back</button>
        </Link>
      </div>
    </div>
  );
};

export async function getStaticProps(context: any) {
  const { data } = await _TodoService.Show(context.params.id);

  return {
    props: { todo: data },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { data } = await _TodoService.Index();

  const paths = data.map((todo) => ({
    params: { id: todo._id },
  }));

  return { paths, fallback: "blocking" };
}

export default TodoShow;
