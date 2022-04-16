import styles from "styles/Done.module.scss";
import { Task } from "@components";
import { useDrop } from "react-dnd";
import { DroppelNames } from "@constants";
import { Todo } from "@interfaces";

export const Done = ({ todos }: { todos: Todo[] }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: DroppelNames.DONE }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  return (
    <div
      ref={drop}
      role={DroppelNames.DONE}
      className={`${styles.doneSection} ${isActive ? " opacity-70" : ""}`}
    >
      <div className={styles.doneSection_Header}>
        <div>
          <div className={styles.doneSection_name}>Done</div>
          <div className={styles.doneSection_name_ex}>Already done.</div>
        </div>
      </div>

      <div className=" flex flex-col">
        <Task></Task>
        <Task></Task>

        <Task></Task>
      </div>
    </div>
  );
};
