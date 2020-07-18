import Head from 'next/head'
import Link from 'next/link'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { format, parseISO } from 'date-fns'
import { formatPath } from '@/components/utils'
import { frontMatter } from './**/*.mdx'

const Home = () => {
  const list = [...frontMatter].sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  return (
    <Page>
      <Head>
        <title>Blog | Harris Jose</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="mt-24">
          <h1 className="text-5xl font-semibold">Blog</h1>
        </div>
        <div className="mt-2">
          {list.map((page) => (
            <div key={page.__resourcePath}>
              <Link href={formatPath(page.__resourcePath)}>
                <div className="mt-10 cursor-pointer">
                  <a className="text-2xl font-medium">{page.title}</a>
                  <div
                    className="text-lg mt-1 text-light"
                    dangerouslySetInnerHTML={{ __html: page.excerpt }}
                  ></div>
                  <div className="mt-5 text-sm text-light">
                    {format(parseISO(page.date), 'MMMM dd, yyyy')}
                    {` • `}
                    {page.readingTime}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </Page>
  )
}

export default Home
