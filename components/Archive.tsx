import { Task } from "@components";
import styles from "styles/Archive.module.scss";
import { useDrop } from "react-dnd";
import { DroppelNames } from "@constants";
import { Todo } from "@interfaces";

export const Archive = ({ todos }: { todos: Todo[] }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: DroppelNames.ARCHIVE }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      role={DroppelNames.ARCHIVE}
      className={`${styles.archiveSection} ${isActive ? " opacity-70" : ""}`}
    >
      <div className={styles.archiveSection_Header}>
        <div>
          <div className={styles.archiveSection_name}>archive</div>
          <div className={styles.archiveSection_name_ex}>what you're doing</div>
        </div>
      </div>

      <div className=" flex flex-col">
      {todos.map((T) => {
          return <Task key={T._id} todo={T}></Task>;
        })}
      </div>
    </div>
  );
};
