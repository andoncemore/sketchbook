import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from "../styles/postList.module.css"
// import * as styles from '../styles/home.module.css'

const IndexPage = ({data, location}) => {
  const edges = data.allMarkdownRemark.edges;
  return (
    <>
      <div className={styles.wrapper}>
        <h1>All Pages</h1>
        <ul className={styles.list}>
          {edges.filter((edge) => !edge.node.frontmatter.tags.includes('wip')).map((edge) => {
            return <li key={edge.node.frontmatter.title}><Link to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link></li>
          } 
          )}
        </ul>
      </div>
    </>
  )
}


export const Head = () => <title>Home Page</title>

export const query = graphql`
  query {
    allMarkdownRemark(filter: {frontmatter: {tags: {regex: "/definition|note|how-to|sketch|book/"}}}) {
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

export default IndexPage