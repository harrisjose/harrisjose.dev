import fs from 'fs'
import path from 'path'
import glob from 'glob'
import matter from 'gray-matter'
import marked from 'marked'
import readingTime from 'reading-time'
import { format } from 'date-fns'

export const POSTS_PATH = path.join(process.cwd(), 'posts')

export const POSTS = glob.sync(path.join(POSTS_PATH, '**/*.mdx'))

export const NOTES_PATH = path.join(process.cwd(), 'notes')

export const NOTES = glob.sync(path.join(NOTES_PATH, '**/*.md'))

export const insertFrontMatter = (mdxContent, frontMatter = {}) => {
  let excerpt =
    frontMatter.layout == 'note'
      ? marked(matter(mdxContent).content)
      : marked(frontMatter.excerpt || '')

  let date =
    frontMatter.layout === 'note'
      ? Number(frontMatter.createdAt)
      : format(frontMatter.date, 'yyyy-MM-dd')

  return {
    readingTime: readingTime(mdxContent).text,
    excerpt,
    date,
  }
}

export const getMdx = (filePath) => {
  const source = fs.readFileSync(filePath)
  const { data, content } = matter(source)
  const frontMatter = { ...data, ...insertFrontMatter(content, data) }

  return { content, data: frontMatter }
}

export const getPostSlug = (filePath) => {
  filePath = path.relative(POSTS_PATH, filePath)
  return path.parse(filePath).dir
}

export const getPostPath = (slug) => {
  return path.join(POSTS_PATH, slug, 'index.mdx')
}

export const getNoteSlug = (filePath) => {
  filePath = path.relative(NOTES_PATH, filePath)
  return path.parse(filePath).name
}

export const getNotePath = (slug) => {
  return path.join(NOTES_PATH, slug) + '.md'
}

export const mdxOptions = {
  remarkPlugins: [
    require('remark-slug'),
    [
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
    ],
    require('remark-code-titles'),
  ],
  rehypePlugins: [require('@mapbox/rehype-prism')],
}
