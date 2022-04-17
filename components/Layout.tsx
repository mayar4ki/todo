import React from 'react'
import styles from "styles/Layout.module.scss";


export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
  <h1 className={`${styles.todoHeader}  `}>
          TODO LIST
        </h1>
        

{children}

    </>
  )
}
