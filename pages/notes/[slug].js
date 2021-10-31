import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { format } from 'date-fns'
import { getMdx, getNoteSlug, getNotePath, NOTES, mdxOptions } from 'utils/mdx'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

export async function getStaticPaths() {
  return {
    paths: NOTES.map((filePath) => {
      return {
        params: {
          slug: getNoteSlug(filePath),
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const { content, data } = getMdx(getNotePath(slug))
  const mdxSource = await serialize(content, { mdxOptions })
  return { props: { content: mdxSource, frontMatter: data } }
}

const Note = ({ content, frontMatter }) => (
  <Page className="flex flex-col">
    <Head>
      <title>
        {format(frontMatter.createdAt, 'MMMM dd, yyyy')} | Harris Jose
      </title>
    </Head>

    <Header />

    <main
      className={`container max-w-screen-md mx-auto note-container text-lg mt-10 md:mt-16`}
    >
      <MDXRemote {...content} />
      <div className="mt-5">
        <a href={frontMatter.link} className="text-link link break-words">
          {frontMatter.link}
        </a>
        <div className="text-sm font-light text-light mt-1">
          {format(frontMatter.createdAt, 'MMMM dd, yyyy')}
        </div>
      </div>
    </main>
    <Footer />
  </Page>
)

export default Note
