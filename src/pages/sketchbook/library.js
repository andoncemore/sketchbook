import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from "../../styles/postList.module.css"



const LibraryPage = ({data, location}) => {
  const edges = data.allMarkdownRemark.edges;

  return (
    <div className={styles.wrapper}>
      <h1>Library</h1>
      <p>Books and reading lists</p>
      <ul className={styles.list}>
        {edges.map((edge) => {
          return <li key={edge.node.frontmatter.title}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>
        } 
        )}
      </ul>
    </div>
  )
}

export const Head = () => <title>Library Page</title>

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {tags: {regex: "/book/"}}}) {
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

export default LibraryPage