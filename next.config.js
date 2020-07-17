const withMdxEnhanced = require('next-mdx-enhanced')
const marked = require('marked')
const readingTime = require('reading-time')
const rehypePrism = require('@mapbox/rehype-prism')

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [rehypePrism],
  extendFrontMatter: {
    process: (mdxContent, frontMatter = {}) => ({
      readingTime: readingTime(mdxContent).text,
      excerpt: marked(frontMatter.excerpt || ''),
    }),
    phase: 'both',
  },
})({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    })

    return config
  },
})
