/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Adit's Notebook`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/Notebook`,
        ignore: ['**/_templates', '**/_navigation', '**/.obsidian', '**/_drawings']
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `test-vault`,
        remote: `https://github.com/andoncemore/test-markdown-vault.git`,
        branch: `main`,
        patterns: ['!**/{_templates,_navigation,_drawings,.obsidian}/**', '**/*.md', 'images/**']
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: `<!-- end -->`,
        plugins: [
          'list-to-gallery',
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              showCaptions: [`title`]
            }
          },
          {
            resolve: '@idmyn/gatsby-remark-wiki-link',
            options: {
              pageResolver: (name) => [name],
              hrefTemplate: (permalink) => `${permalink}`,
              aliasDivider: '|'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: false
            }
          },
          `remark-tufte`,
        ]
      }
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        custom: [
          {
            name: ["Fiyona"],
            file: "custom-fonts.css"
          }
        ],
        web: [
          {
            name: `DM Sans`,
            file: `https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap`,
          },
          {
            name: `IBM Plex Serif`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap`,
          },
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`,
          },
        ],
      },
    }
  ]
}
