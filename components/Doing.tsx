import { Task } from "@components";
import styles from "styles/Doing.module.scss";
import { useDrop } from "react-dnd";
import { DroppelNames } from "@constants";
import { Todo } from "@interfaces";
import CircularProgress from "@mui/material/CircularProgress";

export const Doing = ({  todos,  Loading }: {  todos: Todo[];  Loading: boolean;}) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: DroppelNames.DOING }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      role={DroppelNames.DOING}
      className={`${styles.doingSection} ${isActive ? " opacity-70" : ""}`}
    >
      <div className={styles.doingSection_Header}>
        <div>
          <div className={styles.doingSection_name}>Doing</div>
          <div className={styles.doingSection_name_ex}>what you're doing</div>
        </div>
      </div>

      {Loading ? (
        <div className=" w-full mt-10 text-center">
          <CircularProgress />
        </div>
      ) : (
        <div className=" flex flex-col">
          {todos.map((T) => {
            return <Task key={T._id} todo={T}></Task>;
          })}
        </div>
      )}
    </div>
  );
};
