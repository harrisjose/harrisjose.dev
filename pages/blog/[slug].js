import Head from '@/components/head'
import Page from '@/components/page'
import Contact from '@/components/contact'
import Now from '@/components/now'
import Bio from '@/components/bio'
import { format, parseISO } from 'date-fns'
import { NextSeo } from 'next-seo'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import {
  POSTS,
  getMdx,
  getPostSlug,
  getPostPath,
  getMdxOptions,
} from 'utils/mdx'

export async function getStaticPaths() {
  return {
    paths: POSTS.map((filePath) => {
      return {
        params: {
          slug: getPostSlug(filePath),
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const { content, data } = getMdx(getPostPath(slug))
  const mdxOptions = await getMdxOptions()
  const mdxSource = await serialize(content, {
    mdxOptions,
  })
  return { props: { content: mdxSource, frontMatter: data } }
}

const Blog = ({ content, frontMatter }) => (
  <Page className="flex flex-col">
    <Head>
      <title>{frontMatter.title} | Harris Jose</title>
    </Head>

    <NextSeo
      openGraph={{
        title: frontMatter.title,
        description: frontMatter.excerpt,
        url: `https://harrisjose.dev/${frontMatter.slug}`,
        type: 'article',
        article: {
          publishedTime: frontMatter.date,
          authors: ['https://harrisjose.dev'],
          tags: frontMatter.tags,
        },
        images: [
          {
            url: `https://opengraph.harrisjose.dev?title=${frontMatter.title}&description=${frontMatter.excerpt_raw}`,
            alt:
              'Harris Jose | Senior Software Engineer at ChronicleHQ | React, Node.js, JavaScript',
            width: 1200,
            height: 600,
          },
        ],
      }}
    />

    <main className="container relative max-w-screen-sm mx-auto mb-16">
      <h1 className="text-lg mt-20 mb-0 font-bold">{frontMatter.title}</h1>
      <div className="text-sm text-dim mt-2">
        Published on{' '}
        {format(
          parseISO(frontMatter.date, 'yyyy-MM-dd', new Date()),
          'MMMM dd, yyyy'
        )}
        {` • `}
        {frontMatter.readingTime}
      </div>
      <div className="mt-8 article">
        <MDXRemote {...content} />
      </div>

      <Bio />
      <Contact />
      <Now />
    </main>
  </Page>
)

export default Blog
