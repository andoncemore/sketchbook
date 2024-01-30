import * as React from 'react'
import * as styles from "../styles/postList.module.css"
// import * as styles from '../styles/home.module.css'

const NotFoundPage = ({location}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <h1>Page Not Found</h1>
      </div>
    </>
  )
}


export const Head = () => <title>404 Not Found</title>


export default NotFoundPage;