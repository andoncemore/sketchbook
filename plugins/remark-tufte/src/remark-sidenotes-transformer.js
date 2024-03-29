const getSlug = require("speakingurl");
// import getSlug from 'speakingurl'
// import {visit} from 'unist-util-visit'
// import {select} from 'unist-util-select'
// import {toHtml} from 'hast-util-to-html'
// import {toHast} from 'mdast-util-to-hast'
const visit = require("unist-util-visit");
const select = require("unist-util-select").select;
const toHAST = require("mdast-util-to-hast");
const toHTML = require("hast-util-to-html");

const MARGINNOTE_SYMBOL = "{-}";

function sidenotes() {
  return transformer;
}

const generateInputId = (isMarginNote, title) =>
  `${isMarginNote ? "md" : "sd"}-${getSlug(title, { truncate: 20 })}`;

const getReplacement = ({ isMarginNote, noteHTML }) => {
  const inputId = generateInputId(isMarginNote, noteHTML);
  const labelCls = `margin-toggle ${isMarginNote ? "" : "sidenote-number"}`;
  const labelSymbol = isMarginNote ? "&#8853;" : "";
  const noteTypeCls = isMarginNote ? "marginnote" : "sidenote";

  return [
    {
      type: "html",
      value: `<label for="${inputId}" class="${labelCls}">${labelSymbol}</label>`,
    },
    {
      type: "html",
      value: `<input type="checkbox" id="${inputId}" class="margin-toggle" />`,
    },
    {
      type: "html",
      value: `<span class="${noteTypeCls}">${noteHTML}</span>`,
    }
  ];
};

const coerceToHtml = (nodeArray) =>
  nodeArray.map((node) => toHTML(toHAST(node))).join("") || "";

const extractNoteFromHtml = (note) => {
  const matches = note.match(/(\s+)*({-})*\s*((.|\n)+)/);
  return {
    isMarginNote: matches[2] === MARGINNOTE_SYMBOL,
    noteHTML: matches[3],
  };
};

function transformer(tree) {
  // "Regular" Sidenotes/Marginnotes consisting of a reference and a definition
  // Syntax for Sidenotes [^<number>] and somewhere else [^<number]: <markdown>
  // Syntax for Marginnotes [^<descriptor>] and somewhere else [^<descriptor]: {-}
  visit(tree, "footnoteReference", (node, index, parent) => {
    const target = select(
      `footnoteDefinition[identifier=${node.identifier}]`,
      tree
    );

    // if (!target.length)
    //   throw new Error(`No coresponding note found for "${node.identifier}"`);

    const notesAst =
      target.children.length && target.children[0].type === "paragraph"
        ? target.children[0].children
        : target.children;

    const nodeDetail = extractNoteFromHtml(coerceToHtml(notesAst));

    const replacement=  getReplacement(nodeDetail);
    parent.children.splice(index, 1, ...replacement);
  });

  visit(tree, "footnoteDefinition", (node, index, parent) => {
    parent.children.splice(index, 1);
  });

  // "Inline" Sidenotes which do not have two parts
  // Syntax: [^{-} <markdown>]
  visit(tree, "footnote", (node, index, parent) => {
    const notesAst = node.children;
    const nodeDetail = extractNoteFromHtml(coerceToHtml(notesAst));

    parent.children.splice(index, 1, ...getReplacement(nodeDetail));
  });

  // Only for testing
  return tree;
}

module.exports = sidenotes;