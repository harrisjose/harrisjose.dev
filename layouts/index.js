import Meta from '@/components/meta'
import { format } from 'date-fns'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default (frontMatter) => ({ children: content }) => (
  <Page className="flex flex-col">
    <Meta>
      <title>{frontMatter.title} | Harris Jose</title>
    </Meta>

    <Header />

    <main className={`container max-w-screen-md mx-auto mb-16 article`}>
      <h1 className="text-4xl md:text-5xl mt-8 mb-0 font-bold leading-tight">
        {frontMatter.title}
      </h1>
      <div className="text-sm font-light text-light mt-5 mb-12">
        {format(frontMatter.date, 'MMMM dd, yyyy')}
        {` • `}
        {frontMatter.readingTime}
      </div>

      {content}
    </main>
    <Footer />
  </Page>
)
