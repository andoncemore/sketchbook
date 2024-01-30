"use strict";

// import sidenotes from './src/remark-sidenotes-transformer.js'
const sidenotes = require("./src/remark-sidenotes-transformer")();
const wrapInSection = require("./src/wrap-in-section-transformer")();

module.exports =({ markdownAST }, pluginOptions = {}) => {
    try {
        sidenotes(markdownAST);
    } catch (error) {
        console.error("Error applying sidenotes: ", error);
    }
    // wrapInSection(markdownAST);
    return markdownAST;
};