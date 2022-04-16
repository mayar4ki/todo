import { Task } from '@components'
import styles from "styles/Doing.module.scss";

export const Doing = () => {
  return (
    <div className={styles.doingSection}>
    <div className={styles.doingSection_Header}>
      <div>
        <div className={styles.doingSection_name}>Doing</div>
        <div className={styles.doingSection_name_ex}>
          what you're doing
        </div>
      </div>
    </div>

    <div className=" flex flex-col">
      <Task></Task>
      <Task></Task>
    </div>
  </div>
  )
}
