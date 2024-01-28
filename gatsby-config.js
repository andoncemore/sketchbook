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
        ignore: ['**/_templates', '**/_navigation', '**/.obsidian']
      },
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
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `dm sans\:500,500i,700,700i`,
          `ibm plex serif\:400,400i,500,500i,700,700i`
        ],
        display: 'swap'
      }
    }
  ]
}
