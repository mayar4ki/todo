import styles from "styles/Done.module.scss";
import { Task } from '@components';


export const Done = () => {
  return (
    <div className={styles.doneSection}>
    <div className={styles.doneSection_Header}>
      <div>
        <div className={styles.doneSection_name}>Done</div>
        <div className={styles.doneSection_name_ex}>
          Already done.
        </div>
      </div>
    </div>

    <div className=" flex flex-col">
      <Task></Task>
      <Task></Task>

      <Task></Task>
    </div>
  </div>
  )
}
