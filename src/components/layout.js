import * as React from 'react'
import { Link } from 'gatsby'
import * as styles from './layout.module.css'


const Layout = ({ children, location, tags }) => {
  return (
    <div>
      <ul className={styles.nav}>
        <li className={styles.logo}><Link to="/">adit</Link></li>
      </ul>
      <nav className={styles.header}>
        <div className={styles.primary}>
          <ul className={styles.pageTitles}>
            {/* <li><Link to="/">portfolio</Link></li> */}
            <li><Link to="/">sketchbook</Link></li>
          </ul>
        </div>
        <div className={styles.secondary}>
          <ul className={styles.sketchbookTabs}>
            <Link to="/">feed</Link>
            <Link to="/archive">archive</Link>
            {/* <Link to="/tutorials">tutorials</Link> */}
          </ul>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout