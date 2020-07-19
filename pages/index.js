import Link from 'next/link'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Meta from '@/components/meta'
import { format, parseISO } from 'date-fns'
import { frontMatter } from './**/*.mdx'
import { formatPath } from '@/components/utils'

import Github from '@/icons/github.svg'
import Twitter from '@/icons/twitter.svg'
import LinkedIn from '@/icons/linkedin.svg'

const Home = () => {
  const articles = [...frontMatter]
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 2)

  return (
    <Page>
      <Meta>
        <title>Harris Jose</title>
      </Meta>

      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="mt-24">
          <h1 className="text-5xl font-semibold">Hi, I'm Harris</h1>
          <div className="text-xl max-w-screen-sm">
            I’m a frontend engineer working on web apps at{' '}
            <a
              className="text-special"
              href="https://facilio.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open company website in a new tab"
            >
              @FacilioInc
            </a>
          </div>
          <div className="flex mt-8">
            <a
              href="https://github.com/harrisjose"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open twitter profile in a new tab"
            >
              <Github className="h-6 w-6 mr-6"></Github>
            </a>
            <a
              href="https://twitter.com/harrispjose"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open twitter profile in a new tab"
            >
              <Twitter className="h-6 w-6 mr-6"></Twitter>
            </a>
            <a
              href="https://www.linkedin.com/in/harrisjose"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open twitter profile in a new tab"
            >
              <LinkedIn className="h-6 w-6 mr-6"></LinkedIn>
            </a>
          </div>
        </div>
        <div className="mt-32 flex flex-col">
          <div className="text-3xl font-semibold mb-6">Recent Articles</div>
          {articles.map((page) => (
            <div key={page.__resourcePath}>
              <Link href={formatPath(page.__resourcePath)}>
                <div className="mb-10 cursor-pointer">
                  <a className="text-xl font-medium">{page.title}</a>
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
