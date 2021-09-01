import Link from 'next/link'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from '@/components/head'
import SocialHeader from '@/components/social-header'
import { frontMatter } from './**/*.mdx'
import { formatPath } from 'utils'

const Home = () => {
  const articles = [...frontMatter]
    .filter((page) => !page.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 3)

  return (
    <Page>
      <Head></Head>

      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="aurora"></div>

        <section className="mt-24">
          <h1 className="text-5xl md:text-6xl font-semibold">
            Hi, I'm Harris.
          </h1>
          <div className="text-lg text-light mt-3 max-w-screen-md">
            I’m a senior software engineer working at{' '}
            <a
              className="text-special"
              href="https://facilio.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open company website in a new tab"
            >
              @FacilioInc
            </a>{' '}
            where I help build fast and responsive web experiences. I mostly do
            front-end development using React and Vue.js, and I’m a huge
            Javascript nerd.
          </div>
          <div className="text-lg text-light mt-3 max-w-screen-md">
            I share what I learn on my{' '}
            <Link href={'/blog'} aria-describedby="Go to blog">
              <a className="text-link">Blog</a>
            </Link>{' '}
            and write about what I'm working on at{' '}
            <a
              className="text-link"
              href="https://work.harrisjose.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open my Polywork profile on a new tab"
            >
              Polywork
            </a>
            .
          </div>

          <SocialHeader />
        </section>
        <section className="mt-24 flex flex-col">
          <div className="text-sm font-bold text-light mb-8 uppercase">
            Recent Articles
          </div>
          <div className="md:flex md:flex-row md:flex-wrap">
            {articles.map((page) => (
              <Link
                href={formatPath(page.__resourcePath)}
                key={page.__resourcePath}
              >
                <article className="article-card bg-frost cursor-pointer">
                  <div className="mb-4 md:mb-10">
                    <h3 className="text-2xl font-semibold">{page.title}</h3>
                    <div
                      className="text-base mt-3 text-light"
                      dangerouslySetInnerHTML={{ __html: page.excerpt }}
                    ></div>
                    <div className="mt-5 text-sm text-light">
                      {page.readingTime}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </Page>
  )
}

export default Home
