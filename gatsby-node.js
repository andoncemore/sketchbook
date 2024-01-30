const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const visit = require("unist-util-visit");
const selectAll = require("unist-util-select").selectAll;
const toHTML = require("hast-util-to-html");

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if(node.internal.type === 'MarkdownRemark'){
        const gardenTags = ['sketch', 'definition', 'note', 'book', 'how-to']
        let base = ''
        if (node.frontmatter.tags){ 
            console.log(node.frontmatter.tags, "THIS")
            base = gardenTags.some((t)=>  node.frontmatter.tags.includes(t)) ? '/sketchbook' : ''
        }
        let slug = createFilePath({ node, getNode, basePath: ``, trailingSlash: false });
        slug = base + slug.replace(/\s+/g, '-').toLowerCase();
        console.log(slug);
        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
    }
}

exports.createPages = async ({ graphql, actions }) =>  {
    const { createPage } = actions
    const blogPostTemplate = path.resolve(`src/templates/generic-post.js`)
    let result = await graphql(`
      query loadPagesQuery ($limit: Int!) {
        allMarkdownRemark(limit: $limit) {
          edges {
            node {
              frontmatter {
                title
                shortdesc
                tags
              }
              parent {
                ... on File {
                  name
                }
              }
              fields {
                slug
              }
              htmlAst
              id
            }
          }
        }
      }
    `, { limit: 1000 })

    let allTags = result.data.allMarkdownRemark.edges.reduce((a, v) => ({
        ...a, 
        [v.node.parent.name]: { 
            tags: v.node.frontmatter.tags, 
            shortdesc: v.node.frontmatter.shortdesc,
            slug: v.node.fields.slug
        } 
    }), {})

    // let { visit } = await import('unist-util-visit')
    // let { selectAll } = await import('unist-util-select')
    // const { toHtml } = await import('hast-util-to-html')
    console.log("Yay", selectAll);
    result.data.allMarkdownRemark.edges.forEach(edge => {
        let newAst = edge.node.htmlAst;
        // console.log(edge.node.fields.slug);
        visit(newAst, (node) => {
            if(node){
                if(node.tagName == 'a' && node.properties.className ){
                    if(node.properties.className.includes('internal')){
                        let info = allTags[node.properties.href];
                        if(info){
                            if(info.slug){
                                node.properties.href = info.slug
                            }
                            if(info.tags){
                                node.properties.className = `internal`;
                                node.properties.dataTags = `${info.tags}`;
                                node.properties.dataTooltipHtml = `<span>${info.tags}</span><span>${info.shortdesc}</span>`;
                                node.properties.dataTooltipId = "link-tooltip";
                                console.log(info.tags);
                                // node.properties.href = 
                            }
                        }
                        else{
                            node.tagName = "span";
                            node.properties.href = '';
                        }

                        // console.log(node.properties.href );
                    }
                }
            }
        })

        let count = 0
        visit(newAst, (node) => node.properties?.className == 'gatsby-resp-image-image',
            (node) => {
                node.properties.dataIndex = count;
                count = count + 1;
            }
        )

        let rawImages = selectAll('element[tagName=img]', newAst);
        let allImages = rawImages.map((img) => {
            let aspectRatio = img.properties.aspectratio;
            return {
                title: img.properties.title,
                alt: img.properties.alt,
                images: img.properties.srcSet.map((subImage) => {
                    let w = parseInt(subImage.split(" ")[1].slice(0,-1))
                    return {
                        src: subImage.split(" ")[0],
                        width: w,
                        height: w / aspectRatio,
                    }
                })
            }
        })

        let updatedHTML = toHTML(newAst);

        createPage({
            path: `${edge.node.fields.slug}`,
            component: blogPostTemplate,
            context: {
                id: edge.node.id,
                html: updatedHTML,
                imageList: allImages
            }
        })
    })
    
    
    // then(result => {
    //   if (result.errors) {
    //     throw result.errors
    //   }
    //     import('unist-util-visit').then((module) => {
    //     // Create blog post pages.
    //     result.data.allMarkdownRemark.edges.forEach(edge => {
            // module.visit(edge.node.htmlAst, (node) => {
            //     if(node.tagName == 'a' && node.properties.className ){
            //         if(node.properties.className.includes('internal')){
            //             console.log(node.properties.className);
            //         }
            //     }
            // })

    //         createPage({
    //         // Path for this page — required
    //             path: `${edge.node.parent.name.replace(/ /g, '-').toLowerCase()}`,
    //             component: blogPostTemplate,
    //             context: {
    //                 id: edge.node.id
    //                 // Add optional context data to be inserted
    //                 // as props into the page component.
    //                 //
    //                 // The context data can also be used as
    //                 // arguments to the page GraphQL query.
    //                 //
    //                 // The page "path" is always available as a GraphQL
    //                 // argument.
    //             },
    //         })
    //     })

    //   })
      
    // })
  }