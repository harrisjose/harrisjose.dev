import Head from 'next/head'
import { format } from 'date-fns'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from './index.module.scss'

export default (frontMatter) => ({ children: content }) => (
  <Page className="flex flex-col">
    <Head>
      <title>{frontMatter.title} | Harris Jose</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header />

    <main className={`container max-w-screen-md mx-auto mb-16 ${styles.article}`}>
      <h1 className="text-4xl md:text-5xl mt-8 mb-0 font-bold leading-tight">{frontMatter.title}</h1>
      <div className="text-sm font-light mt-5 mb-12">
        {format(frontMatter.date, 'MMMM dd, yyyy')}
        {` • `}
        {frontMatter.readingTime}
      </div>

      {content}
    </main>
    <Footer />
  </Page>
)
