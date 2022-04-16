import { Task } from "@components";
import styles from "styles/Doing.module.scss";
import { useDrop } from "react-dnd";
import { DroppelNames } from "@constants";

export const Doing = () => {
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

      <div className=" flex flex-col">
        <Task></Task>
        <Task></Task>
      </div>
    </div>
  );
};
