import React from 'react'
import Link from 'next/link'
import Head from '@/components/head'
import Page from '@/components/page'
import Bio from '@/components/bio'
import Now from '@/components/now'
import Contact from '@/components/contact'
import { format, parseISO } from 'date-fns'
import { getMdx, POSTS, getPostSlug } from 'utils/mdx'

export function getStaticProps() {
  const posts = POSTS.map((filePath) => {
    const { data } = getMdx(filePath)

    return {
      ...data,
      slug: getPostSlug(filePath),
    }
  })

  return { props: { posts } }
}

const Home = ({ posts }) => {
  const articles = posts
    .filter((page) => !page.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

  return (
    <Page>
      <Head>
        <title>Writing | Harris Jose</title>
      </Head>

      <main className="container max-w-screen-sm mx-auto mb-16">
        <section className="mt-20">
          <h1 className="text-lg font-semibold">Writing</h1>
          <div className="mt-6 grid grid-cols-split gap-x-9 gap-y-9">
            {articles.map((page) => (
              <React.Fragment key={page.slug}>
                <div className="text-dim">
                  {format(parseISO(page.date), 'MMMM, yyyy')}
                </div>
                <div>
                  <Link href={`blog/${page.slug}`}>
                    <a className="text-light underline hover:text-dark">
                      {page.title}
                    </a>
                  </Link>
                  <div
                    className="mt-2.5 text-dim"
                    dangerouslySetInnerHTML={{ __html: page.excerpt }}
                  ></div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

        <Bio />
        <Contact />
        <Now />
      </main>
    </Page>
  )
}

export default Home
