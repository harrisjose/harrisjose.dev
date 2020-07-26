import Meta from '@/components/meta'
import { format } from 'date-fns'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default (frontMatter) => ({ children: content }) => (
  <Page className="flex flex-col">
    <Meta>
      <title>
        {format(frontMatter.createdAt, 'MMMM dd, yyyy')} | Harris Jose
      </title>
    </Meta>

    <Header />

    <main
      className={`container max-w-screen-md mx-auto note-container text-lg mt-10 md:mt-16`}
    >
      {content}

      <div className="mt-5">
        <a href={frontMatter.link} className="text-link break-words">
          {frontMatter.link}
        </a>
        <div className="text-sm font-light text-light mt-1">
          {format(frontMatter.createdAt, 'MMMM dd, yyyy')}
        </div>
      </div>
    </main>
    <Footer />
  </Page>
)
