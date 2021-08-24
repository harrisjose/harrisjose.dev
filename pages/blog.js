import Link from 'next/link'
import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { format, parseISO } from 'date-fns'
import { formatPath } from 'utils'
import { frontMatter } from './blog/**/*.mdx'

const Home = () => {
  const list = [...frontMatter]
    .filter((page) => !page.draft)
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))

  return (
    <Page>
      <Head>
        <title>Blog | Harris Jose</title>
      </Head>

      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="aurora"></div>

        <div className="mt-12 md:mt-24">
          <h1 className="text-5xl font-semibold">Blog</h1>
        </div>
        <div className="mt-5 md:flex md:flex-row md:flex-wrap">
          {list.map((page) => (
            <Link
              href={formatPath(page.__resourcePath)}
              key={page.__resourcePath}
            >
              <article className="article-card bg-frost cursor-pointer">
                <div className="mb-4 md:mb-10">
                  <div className="text-sm text-light">
                    {format(parseISO(page.date), 'MMMM dd, yyyy')}
                  </div>
                  <h2 className="text-2xl font-semibold mt-5">{page.title}</h2>
                  <div
                    className="text-lg text-light mt-3"
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
      </main>

      <Footer />
    </Page>
  )
}

export default Home
