import { AddSvg } from "@svgs";
import styles from "styles/Todo.module.scss";
import { Task } from "@components";

export const Todo = () => {
  return (
    <div className={styles.todoSection}>
      <div className={styles.todoSection_Header}>
        <div>
          <div className={styles.todoSection_name}>TO Do</div>
          <div className={styles.todoSection_name_ex}>
            things that need to be done
          </div>
        </div>

        <div className={styles.todoSection_AddButton}>
          <AddSvg />
        </div>
      </div>

      <div className=" flex flex-col">
        <Task></Task>

      </div>
    </div>
  );
};
