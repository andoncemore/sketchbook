import * as React from 'react'
import { Link, navigate, useStaticQuery, graphql } from 'gatsby'
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
// import { CaretDownIcon } from '@radix-ui/react-icons'
// import { gardenTabs } from './gardenTags'
import * as styles from './layout.module.css'


// const GardenButton = React.forwardRef((props, forwardedRef) => (
//   <div className={styles.gardenDropdown}  data-state={props['data-state']} >
//     <button {...props} ref={forwardedRef}>garden</button>
//     <ul className={styles.gardenEmojis}>
//       {gardenTabs.map(elm => 
//         <li key={elm.name}>
//           <button 
//             className={props.activetags.includes(elm.id) ? 'active' : ''}
//             onClick={() => navigate(elm.url)}
//           >
//             <span style={{filter:elm.filter}}>{elm.emoji}</span>
//           </button>
//         </li>
//       )}
//     </ul>
//     <button className={styles.gardenCaret} {...props}><CaretDownIcon /></button>
//   </div>
// ));

const Layout = ({ children, location, tags }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allSitePage(filter: {componentChunkName: {regex: "/component---src-pages/"}}) {
        edges {
          node {
            path
          }
        }
      }
    }
  `)
  let exclusions = data.allSitePage.edges.map((edge) => edge.node.path);

  return (
    <div>
      <nav className={`${styles.header} ${exclusions.includes(location.pathname) ? styles.corner : styles.corner}`}>
        <ul className={styles.nav}>
          <li className={styles.logo}><Link to="/">adit</Link></li>
          {/* <li className={styles.pageLink}><Link to="#">design work</Link></li>
          <li>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <GardenButton activetags={tags ? tags : []} />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className={styles.menuContent} align="start" sideOffset={5}>
                  {gardenTabs.map((elm) => 
                    <DropdownMenu.Item 
                      className={styles.menuItem} 
                      onSelect={() => navigate(elm.url)}
                      key={elm.name}
                    >
                      <div> 
                        <span style={{filter:elm.filter}}>{elm.emoji}</span>
                        <span style={{color:elm.color}}>{elm.name}</span>
                      </div>
                    {location.pathname === elm.url && <div className={styles.currentIndicator} style={{background:elm.color}}></div>}
                    </DropdownMenu.Item>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </li> */}
        </ul>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout