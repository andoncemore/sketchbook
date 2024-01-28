import * as React from "react"
import { graphql } from "gatsby"
import * as styles from "../styles/article.module.css"
import Lightbox from "yet-another-react-lightbox";
import { Tooltip } from 'react-tooltip';
import { gardenTabs } from '../components/gardenTags'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import "yet-another-react-lightbox/styles.css";

export default function GenericPostTemplate({
  data, // this prop will be injected by the GraphQL query below.
  pageContext,
  location
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter } = markdownRemark
  const tags = frontmatter.tags ? frontmatter.tags : [];
  let mainTag = gardenTabs.find((tag) => tags.includes(tag.id))
  const { html, imageList } = pageContext;
  const thumbnail = getImage(markdownRemark.frontmatter.thumbnail);

  const [index, setIndex] = React.useState(-1);


  React.useEffect(() => {
    let elements = document.querySelectorAll(".gatsby-resp-image-wrapper");
    elements.forEach((elm) => {
      elm.addEventListener('click', event => {
        console.log(event.target.getAttribute("data-index"));
        setIndex(parseInt(event.target.getAttribute("data-index")))
      })
    })
  },[])

  return (
    <>
      <div className={styles.article}>
          <div className={styles.titlebox}>
            {thumbnail && <GatsbyImage image={thumbnail} style={{width: '150px'}} alt={`thumbnail of ${frontmatter.title}`} />}
            <div className={styles.title}>{frontmatter.title}</div>
            {frontmatter.subtitle && <div className={styles.subtitle}>{frontmatter.subtitle}</div>}
            <ul className={styles.articleInfo}>
              {mainTag && <li>
                <span>
                  <span style={{filter:mainTag.filter, marginRight:'2px'}}>{mainTag.emoji}</span>
                  <span style={{color:mainTag.color}}>{mainTag.id}</span>
                </span>
              </li>}
              {frontmatter.updated && <li>Updated {frontmatter.updated}</li>}
            </ul>
            <hr className={styles.divider}/>
            
          </div>            
          <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: html }}
          />
      </div>
      <Tooltip 
        id="link-tooltip"
        disableStyleInjection="true"
        className={styles.tooltip}
        offset={5}
        delayShow={300}
        delayHide={300}
      />
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={imageList.map((im) => ({
          alt: im.alt,
          src: im.images[im.images.length - 1].src,
          width: im.images[im.images.length - 1].width,
          height: im.images[im.images.length - 1].height,
          srcSet: im.images
        }))}
      />
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        subtitle
        updated
        tags
        thumbnail {
          childImageSharp {
            gatsbyImageData(
              width: 300
              placeholder: BLURRED
            )
          }
        }
      }
    }
  }
`