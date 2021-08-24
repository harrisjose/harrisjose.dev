import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { format } from 'date-fns'
import { NextSeo } from 'next-seo'

const Blog = ({ children: content, frontMatter }) => (
  <Page className="flex flex-col">
    <Head>
      <title>{frontMatter.title} | Harris Jose</title>
    </Head>
    <NextSeo
      openGraph={{
        title: frontMatter.title,
        description: frontMatter.excerpt,
        url: `https://harrisjose.dev/${frontMatter.__resourcePath}`,
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
        Published on {format(frontMatter.date, 'MMMM dd, yyyy')}
        {` • `}
        {frontMatter.readingTime}
      </div>
      <div className="text-sm font-light text-light mt-12 mb-12"></div>
      {content}
    </main>
    <Footer />
  </Page>
)

export default Blog
