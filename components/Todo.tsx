import { AddSvg } from "@svgs";
import styles from "styles/Todo.module.scss";
import { Task } from "@components";
import { useDrop } from "react-dnd";
import { DroppelNames } from "./DroppelNames";

export const Todo = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: DroppelNames.TODO }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      role={DroppelNames.TODO}
      className={`${styles.todoSection} ${isActive ? " opacity-70" : ""}`}
    >
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
