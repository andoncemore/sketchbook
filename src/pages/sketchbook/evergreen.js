import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from "../../styles/postList.module.css"


const EvergreenPage = ({data, location}) => {
  const edges = data.allMarkdownRemark.edges;

  return (
    <div className={styles.wrapper}>
      <h1>Notes</h1>
      <p>Well connected insights</p>
      <ul className={styles.list}>
        {edges.map((edge) => {
          return <li key={edge.node.frontmatter.title}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>
        } 
        )}
      </ul>
    </div>
  )
}

export const Head = () => <title>Evergreen Page</title>

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {tags: {regex: "/notes/"}}}) {
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

export default EvergreenPage