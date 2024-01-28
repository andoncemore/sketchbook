import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from "../../styles/postList.module.css"


const DictionaryPage = ({data, location}) => {
  const edges = data.allMarkdownRemark.edges;

  return (    
    <div className={styles.wrapper}>
      <h1>Dictionary</h1>
      <p>Notes that define terms</p>
      <ul className={styles.list}>
        {edges.map((edge) => {
          return <li key={edge.node.frontmatter.title}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>
        } 
        )}
      </ul>
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {tags: {regex: "/definition/"}}}) {
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

export const Head = () => <title>Dictionary Page</title>

export default DictionaryPage