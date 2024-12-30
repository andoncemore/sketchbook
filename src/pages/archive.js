import * as React from 'react'
import { graphql, Link } from 'gatsby'
// import * as styles from "../styles/postList.module.css"
import * as styles from '../styles/home.module.css'
import { gardenTabs } from '../components/gardenTags'


const Listing = ({title, slug, date, wip}) => {
  return(
    <li key={title}>
      <Link to={slug} className={styles.listing}>

        <div className={`${wip ? styles.listing_title_wip : styles.listing_title}`}>{title}</div>
        <div className={styles.listing_date}>{date}</div>
      </Link>
    </li>
  )
}

const SectionHeader = ({name}) => {
  let tag = gardenTabs.find((tag) => tag.id === name)
  return (
    <h2>
      <span style={{filter:tag.filter, marginRight:'2px'}}>{tag.emoji}</span>
      <span style={{color:tag.color}}>{tag.name}</span>
    </h2>
  )
}

const IndexPage = ({data, location}) => {

  return (
    <>
      <div className={styles.mainContainer}>
        <SectionHeader name="sketch"/>
        <ul className={styles.list}>
          {
            data.sketch.edges.map((edge) => {
              return (
                <Listing
                  title={edge.node.frontmatter.title}
                  slug={edge.node.fields.slug}
                  wip={edge.node.frontmatter.tags.includes('wip')}
                  date={edge.node.frontmatter.updated}
                />
              )
            })
          }
        </ul>

        <SectionHeader name="note"/>
        <ul className={styles.list}>
          {
            data.note.edges.map((edge) => {
              return (
                <Listing
                  title={edge.node.frontmatter.title}
                  slug={edge.node.fields.slug}
                  wip={edge.node.frontmatter.tags.includes('wip')}
                  date={edge.node.frontmatter.updated}
                />
              )
            })
          }
        </ul>

        <SectionHeader name="how-to"/>
        <ul className={styles.list}>
          {
            data.workshop.edges.map((edge) => {
              return (
                <Listing
                  title={edge.node.frontmatter.title}
                  slug={edge.node.fields.slug}
                  wip={edge.node.frontmatter.tags.includes('wip')}
                  date={edge.node.frontmatter.updated}
                />
              )
            })
          }
        </ul>

        <SectionHeader name="definition"/>
        <ul className={styles.list}>
          {
            data.definition.edges.map((edge) => {
              return (
                <Listing
                  title={edge.node.frontmatter.title}
                  slug={edge.node.fields.slug}
                  wip={edge.node.frontmatter.tags.includes('wip')}
                  date={edge.node.frontmatter.updated}
                />
              )
            })
          }
        </ul>
        <SectionHeader name="book"/>
        <ul className={styles.list}>
          {
            data.book.edges.map((edge) => {
              return (
                <Listing
                  title={edge.node.frontmatter.title}
                  slug={edge.node.fields.slug}
                  wip={edge.node.frontmatter.tags.includes('wip')}
                  date={edge.node.frontmatter.updated}
                />
              )
            })
          }
        </ul>
      </div>
    </>
  )
}


export const Head = () => <title>Home Page</title>

// export const query = graphql`
//   query {
//     allMarkdownRemark(filter: {frontmatter: {tags: {regex: "/definition|note|how-to|sketch|book/"}}}) {
//       edges {
//         node {
//           frontmatter {
//             tags
//             title
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `
export const query = graphql`
  query {
    definition: allMarkdownRemark(
      filter: {frontmatter: {tags: {regex: "/definition/"}}}
      sort: {frontmatter: {updated: DESC}}
    ) {
      edges {
        node {
          frontmatter {
            tags
            title
            updated(formatString: "MMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    note: allMarkdownRemark(
      filter: {frontmatter: {tags: {regex: "/note/"}}}
      sort: {frontmatter: {updated: DESC}}
    ) {
      edges {
        node {
          frontmatter {
            tags
            title
            updated(formatString: "MMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    book: allMarkdownRemark(
      filter: {frontmatter: {tags: {regex: "/book/"}}}
      sort: {frontmatter: {updated: DESC}}
    ) {
      edges {
        node {
          frontmatter {
            tags
            title
            updated(formatString: "MMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    sketch: allMarkdownRemark(
      filter: {frontmatter: {tags: {regex: "/sketch/"}}}
      sort: {frontmatter: {updated: DESC}}
    ) {
      edges {
        node {
          frontmatter {
            tags
            title
            updated(formatString: "MMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
    workshop: allMarkdownRemark(
      filter: {frontmatter: {tags: {regex: "/how-to/"}}}
      sort: {frontmatter: {updated: DESC}}
    ) {
      edges {
        node {
          frontmatter {
            tags
            title
            updated(formatString: "MMM YYYY")
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