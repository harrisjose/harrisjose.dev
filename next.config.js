const marked = require('marked')
const withMdxEnhanced = require('next-mdx-enhanced')
const readingTime = require('reading-time')
const matter = require('gray-matter')

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

const insertFrontMatter = (mdxContent, frontMatter = {}) => {
  let excerpt =
    frontMatter.layout == 'note'
      ? marked(matter(mdxContent).content)
      : marked(frontMatter.excerpt || '')

  return {
    readingTime: readingTime(mdxContent).text,
    excerpt,
  }
}

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['md', 'mdx'],
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
