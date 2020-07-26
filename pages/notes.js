import Link from 'next/link'
import Meta from '@/components/meta'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'

import marked from 'marked'
import { format } from 'date-fns'
import { frontMatter } from './notes/*.md'

function formatPath(p) {
  return p.replace(/\.md$/, '')
}

const Home = () => {
  const list = [...frontMatter]
  return (
    <Page>
      <Meta>
        <title>Notes | Harris Jose</title>
      </Meta>
      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="mt-24">
          <h1 className="text-5xl font-semibold">Notes</h1>
        </div>
        <div className="mt-2">
          {list.map((note) => (
            <div key={note.__resourcePath}>
              <Link href={formatPath(note.__resourcePath)}>
                <div className="mt-10 cursor-pointer note-container">
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: marked(note.excerpt) }}
                  ></div>
                  <div className="mt-5">
                    <a
                      href={note.link}
                      className="text-lg text-link break-words"
                    >
                      {note.link}
                    </a>
                    <div className="text-sm font-light text-light mt-1">
                      {format(note.createdAt, 'MMMM dd, yyyy')}
                    </div>
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
