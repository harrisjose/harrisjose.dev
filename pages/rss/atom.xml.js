import { FEED_TYPE, genertateFeed } from 'utils/feed'
import { getMdx, getPostSlug, POSTS } from 'utils/mdx'

export async function getServerSideProps({ res }) {
  const posts = POSTS.map((filePath) => {
    const { data } = getMdx(filePath)

    return {
      ...data,
      slug: getPostSlug(filePath),
    }
  })
    .filter((page) => !page.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

  res.setHeader('Content-Type', 'text/xml')
  res.write(genertateFeed(posts, FEED_TYPE.ATOM))
  res.end()

  return { props: {} }
}

const Feed = () => {}

export default Feed
