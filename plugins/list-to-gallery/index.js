// const visit = require("unist-util-visit")
import visit from 'unist-util-visit'
// const is = require("unist-util-is")


export default function ListToGallery({ markdownAST }, pluginOptions) {

    function checkNode(node){
        // console.log(node);
        if(node.children){
            return node.children.every((n) => checkNode(n))
        }
        else{
            return (node.type == 'image')
        }
    }
    // Manipulate AST
    visit(markdownAST, "list", node => {
        let { ordered, children } = node;
        const data = node.data || (node.data = {})
        const props = data.hProperties || (data.hProperties = {})
        // Skip if its not a bullet list
        if (ordered) return
        if (checkNode(node)) {
            props.className = ['imageGallery']
        }

    })
    return markdownAST


}