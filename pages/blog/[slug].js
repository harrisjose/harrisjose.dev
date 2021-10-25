import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { format, parseISO } from 'date-fns'
import { NextSeo } from 'next-seo'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { POSTS, getMdx, getPostSlug, getPostPath, mdxOptions } from 'utils/mdx'

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
  const mdxSource = await serialize(content, { mdxOptions })
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
            url: 'https://harrisjose.dev/images/opengraph.png',
            alt:
              'Harris Jose | Senior Software Engineer at Facilio | React, Node.js, JavaScript',
            width: 1024,
            height: 1024,
          },
        ],
      }}
    />

    <Header />

    <main className={`container max-w-screen-md mx-auto mb-16 article`}>
      <h1 className="text-4xl md:text-5xl mt-8 mb-0 font-bold leading-tight">
        {frontMatter.title}
      </h1>
      <div className="text-sm font-light text-light mt-5">
        Published on{' '}
        {format(
          parseISO(frontMatter.date, 'yyyy-MM-dd', new Date()),
          'MMMM dd, yyyy'
        )}
        {` • `}
        {frontMatter.readingTime}
      </div>
      <div className="text-sm font-light text-light mt-12 mb-12"></div>
      <MDXRemote {...content} />
    </main>
    <Footer />
  </Page>
)

export default Blog
