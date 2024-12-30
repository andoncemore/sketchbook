import * as React from 'react'
import { graphql, Link } from 'gatsby'
import * as styles from '../styles/feed.module.css'
import { gardenTabs } from '../components/gardenTags'



const Post = ({content, pageTitle, date, tag, slug}) => {
    return(
        <Link to={slug} class={styles.post}>
            <div class={styles.postFooter}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div class={styles.linkTitle}>{`${pageTitle}`}</div>
                    <div class={styles.date}>{date}</div>
                </div>
                <div className={styles.icon}>
                    <svg width="28" height="28" viewBox="0 0 28 28">
                        <defs>
                            <filter id="border">
                                <feMorphology in="SourceAlpha" result="EXPANDED" operator="dilate" radius="2"></feMorphology>
                                <feFlood floodColor="white" result="INDI" />
                                <feComposite in="INDI" in2="EXPANDED" operator="in" />
                                <feComposite in="SourceGraphic" result="MERGED" />
                                <feDropShadow in="MERGED" dx="0" dy="0" floodColor="black" floodOpacity="0.2" stdDeviation="1" />
                            </filter>
                        </defs>
                        <g filter="url(#border)">
                        <text font-size="18px" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" filter={tag.filter}>{tag.emoji}</text>
                        </g>
                    </svg>
                </div>
            </div>
            <div class={styles.postContent}>
                {content}
            </div>
        </Link>
    )
}

const InlinePost = ({ children, date, tag}) => {
    return (
        <div class={styles.post}>
            <div class={styles.postFooter}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <div class={styles.soloDate}>{date}</div>
                    <div className={styles.icon}>
                        <svg width="28" height="28" viewBox="0 0 28 28">
                            <defs>
                                <filter id="border">
                                    <feMorphology in="SourceAlpha" result="EXPANDED" operator="dilate" radius="2"></feMorphology>
                                    <feFlood floodColor="white" result="INDI" />
                                    <feComposite in="INDI" in2="EXPANDED" operator="in" />
                                    <feComposite in="SourceGraphic" result="MERGED" />
                                    <feDropShadow in="MERGED" dx="0" dy="0" floodColor="black" floodOpacity="0.2" stdDeviation="1" />
                                </filter>
                            </defs>
                            <g filter="url(#border)">
                            <text font-size="18px" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" filter={tag.filter}>{tag.emoji}</text>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
            <div class={styles.postContent}>
                {children}
            </div>
        </div>
    )
}


const FeedPage = ({data, location}) => {

    return(
        <>
            <div className={styles.mainContainer}>
                {data.feed.edges.map((edge) => {
                    const tags = edge.node.frontmatter.tags ? edge.node.frontmatter.tags : [];
                    let mainTag = gardenTabs.find((tag) => tags.includes(tag.id))
                    if(edge.node.wordCount.words > 100){
                        return (
                            <Post 
                                tag={mainTag}
                                content={edge.node.frontmatter.shortdesc} 
                                pageTitle={edge.node.frontmatter.title}
                                date={edge.node.frontmatter.updated}
                                slug={edge.node.fields.slug}
                            />
                        )
                    }
                    else{
                        return (
                            <InlinePost
                                tag={mainTag}
                                date={edge.node.frontmatter.updated}
                            >
                                <div
                                    className={styles.longContent}
                                    dangerouslySetInnerHTML={{ __html: edge.node.html }}
                                />
                            </InlinePost>
                        )
                    }
                    
                })}
            </div>

        </>
    )

}

export const query = graphql`
  query {
    feed: allMarkdownRemark(
        filter: {frontmatter: {tags: {regex: "/definition|note|how-to|sketch|book/", ne: "wip"}}}
        sort: {frontmatter: {updated: DESC}}
        limit: 20
    ) {
        edges {
            node {
                frontmatter {
                    tags
                    title
                    updated(formatString: "MMM D")
                    shortdesc
                }
                fields {
                    slug
                }
                wordCount {
                    words
                }
                html
            }
        }
    }
  }
`

export default FeedPage