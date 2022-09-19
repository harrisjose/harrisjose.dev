import React from 'react'
import Link from 'next/link'
import Page from '@/components/page'
import Head from '@/components/head'
import Contact from '@/components/contact'
import Now from '@/components/now'

import { format, parseISO } from 'date-fns'
import { POSTS, getMdx, getPostSlug } from 'utils/mdx'

export async function getStaticProps() {
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
    .filter((page) => !page.draft && page.featured)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 3)

  return (
    <Page>
      <Head></Head>

      <main className="container max-w-screen-sm mx-auto mb-16">
        <section className="mt-20 relative">
          <h1 className="font-semibold text-lg">Harris Jose</h1>
          <div className="text-light">Software Engineer</div>
        </section>

        <section className="mt-20">
          <h2 className="font-semibold">About</h2>
          <div className="text-light mt-6">
            Building fast and responsive web experiences. Thinking about
            developer tools, user interfaces and design systems. Senior software
            engineer at{' '}
            <a
              href="https://chroniclehq.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open company website in a new tab"
              className="underline hover:text-dark"
            >
              Chronicle HQ
            </a>
            .
          </div>
        </section>

        <Contact />

        <Now />

        <section className="mt-16">
          <h2 className="font-semibold">Writing</h2>
          <div className="mt-6 grid grid-cols-split gap-x-9 gap-y-9">
            {articles.map((page) => (
              <React.Fragment key={page.slug}>
                <div className="text-dim">
                  {format(parseISO(page.date), 'MMMM, yyyy')}
                </div>
                <div>
                  <Link href={`/blog/${page.slug}`}>
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
            <div></div>
            <Link href={`/blog/`}>
              <a className="text-dim underline italic hover:text-light">
                more →
              </a>
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-semibold">Links</h2>
          <Link href={'/notes'}>
            <div className="mt-6 text-dim hover:text-light cursor-pointer">
              Bookmarks from stuff I've read over the past couple of years →
            </div>
          </Link>{' '}
        </section>

        <section className="mt-16">
          <h2 className="font-semibold">Work</h2>

          <div className="mt-6 grid grid-cols-split gap-x-9 gap-y-9">
            <div className="text-base text-dim">2021 - Present</div>
            <div className="flex flex-col">
              <a className="text-light underline">Chronicle HQ</a>
              <div className="text-dim text-sm mt-1.5">Remote</div>
              <div className="text-light mt-3"></div>
            </div>

            <div className="text-base text-dim">2019 - 2021</div>
            <div className="flex flex-col">
              <a className="text-light underline">Facilio</a>
              <div className="text-dim text-sm mt-1.5">
                Chennai, India & Remote
              </div>
              <div className="text-light mt-3">
                Core developer in the platform team focussing on front-end
                architecture.
              </div>
            </div>

            <div className="text-base text-dim">2018 - 2019</div>
            <div className="flex flex-col">
              <a className="text-light underline">Zoho Payments & Banking</a>
              <div className="text-dim text-sm mt-1.5">Chennai, India</div>
              <div className="text-light mt-3">
                Worked on payment gateway and bank integrations for the Finance
                Suite of products.
              </div>
            </div>

            <div className="text-base text-dim">2016 - 2018</div>
            <div className="flex flex-col">
              <a className="text-light underline">
                Zoho Checkout & Subscriptions
              </a>
              <div className="text-dim text-sm mt-1.5">Chennai, India</div>
              <div className="text-light mt-3">
                Primary front-end engineer for Zoho Checkout.
              </div>
            </div>
          </div>
        </section>
      </main>
    </Page>
  )
}

export default Home
