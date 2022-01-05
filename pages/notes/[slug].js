import Head from '@/components/head'
import Page from '@/components/page'
import Contact from '@/components/contact'
import Now from '@/components/now'
import Bio from '@/components/bio'
import { format } from 'date-fns'
import {
  getMdx,
  getNoteSlug,
  getNotePath,
  NOTES,
  getMdxOptions,
} from 'utils/mdx'
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
  const mdxSource = await serialize(content, {
    mdxOptions: await getMdxOptions(),
  })
  return { props: { content: mdxSource, frontMatter: data } }
}

const Note = ({ content, frontMatter }) => (
  <Page className="flex flex-col">
    <Head>
      <title>
        {format(frontMatter.createdAt, 'MMMM dd, yyyy')} | Harris Jose
      </title>
    </Head>

    <main className={`container max-w-screen-sm mx-auto note-container mb-16`}>
      <div className="text-light mt-16">
        Created on {format(frontMatter.createdAt, 'MMMM dd, yyyy')}
      </div>

      <div className="mt-4 text-lg">
        <MDXRemote {...content} />
      </div>

      <div className="mt-8">
        <a
          href={frontMatter.link}
          className="underline text-light hover:text-dark break-words"
        >
          {frontMatter.link}
        </a>
      </div>

      <Bio />
      <Contact />
      <Now />
    </main>
  </Page>
)

export default Note
