require("./src/styles/global.css")
require("./src/styles/prism.css")
// require("./src/styles/tufte.css")
const React = require("react")
const Layout = require("./src/components/layout").default

exports.wrapPageElement = ({ element, props }) => {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    let t = props.data?.markdownRemark?.frontmatter?.tags;
    // console.log(t, "THAT");
    // let tagArray = t ? t.split(",").map(tag => tag.trim()) : []

    return <Layout {...props} tags={t}>{element}</Layout>
}
