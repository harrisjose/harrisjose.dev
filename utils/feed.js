import { formatPath } from 'utils'
import { Feed } from 'feed'
import { parseISO } from 'date-fns'

const baseUrl = 'https://harrisjose.dev'
const date = new Date()

export const FEED_TYPE = {
  RSS: 'rss2',
  ATOM: 'atom1',
  JSON: 'json1',
}

export const genertateFeed = (posts, type) => {
  const author = {
    name: 'Harris Jose',
    email: 'harrisjose@outlook.com',
    link: 'https://twitter.com/harrispjose',
  }

  const feed = new Feed({
    title: `Writing | Harris Jose`,
    description: 'Notes and snippets ',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/images/opengraph.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `© ${date.getFullYear()}, Harris Jose`,
    updated: date,
    generator: 'Next.js using Feed',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author,
  })

  posts.forEach((post) =>
    feed.addItem({
      title: post.title,
      id: post.slug,
      link: post.slug,
      content: post.excerpt,
      author: [author],
      contributor: [author],
      date: parseISO(post.date),
    })
  )

  return feed[type]()
}
