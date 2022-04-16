import { Task } from '@components'
import styles from "styles/Archive.module.scss";

export const Archive = () => {
  return (
    <div className={styles.archiveSection}>
    <div className={styles.archiveSection_Header}>
      <div>
        <div className={styles.archiveSection_name}>archive</div>
        <div className={styles.archiveSection_name_ex}>
          what you're doing
        </div>
      </div>
    </div>

    <div className=" flex flex-col">
      <Task></Task>
    </div>
  </div>
  )
}
