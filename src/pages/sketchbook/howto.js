import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from "../../styles/postList.module.css"


const HowToPage = ({data, location}) => {
  const edges = data.allMarkdownRemark.edges;

  return (
    <div className={styles.wrapper}>
      <h1>Tutorials and Workshops</h1>
      {/* <p>Tutorials and other things I've made that are like tutorials</p> */}
      <ul className={styles.list}>
        {edges.map((edge) => {
          return <li key={edge.node.frontmatter.title}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>
        } 
        )}
      </ul>
    </div>

  )
}

export const Head = () => <title>How-To Page</title>

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {tags: {regex: "/how-to/"}}}) {
      edges {
        node {
          frontmatter {
            tags
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default HowToPage