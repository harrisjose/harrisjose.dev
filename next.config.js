const marked = require('marked')
const withMdxEnhanced = require('next-mdx-enhanced')
const readingTime = require('reading-time')

const autLinkHeaders = [
  require('remark-autolink-headings'),
  {
    behavior: 'append',
    content: {
      type: 'element',
      tagName: 'span',
      properties: { className: ['heading-link'] },
      children: [{ type: 'text', value: '#' }],
    },
  },
]

const insertFrontMatter = (mdxContent, frontMatter = {}) => ({
  readingTime: readingTime(mdxContent).text,
  excerpt: marked(frontMatter.excerpt || ''),
})

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx'],
  remarkPlugins: [
    require('remark-slug'),
    autLinkHeaders,
    require('remark-code-titles'),
  ],
  rehypePlugins: [require('@mapbox/rehype-prism')],
  extendFrontMatter: {
    process: insertFrontMatter,
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
