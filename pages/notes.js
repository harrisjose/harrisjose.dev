import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import LinkIcon from '@/icons/link.svg'
import marked from 'marked'
import { format } from 'date-fns'
import { frontMatter } from './notes/*.md'

const Home = () => {
  const list = [...frontMatter].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
  return (
    <Page>
      <Head>
        <title>Notes | Harris Jose</title>
      </Head>
      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="mt-24">
          <h1 className="text-5xl font-semibold">Notes</h1>
        </div>
        <div className="mt-2">
          {list.map((note) => (
            <div key={note.__resourcePath}>
              <a href={note.link} target="_blank" rel="noopener noreferrer">
                <div className="mt-10 cursor-pointer note-container">
                  <div
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: marked(note.excerpt) }}
                  ></div>
                  <div className="mt-5 flex justify-between">
                    <div className="text-lg text-link inline-block truncate flex-shrink">
                      <LinkIcon className="h-3 w-3 mr-1 inline" />
                      <span className="link font-medium">{note.link}</span>
                    </div>
                    <div className="text-sm font-light text-light mt-1 flex-none pl-8">
                      {format(note.createdAt, 'MMMM dd, yyyy')}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </Page>
  )
}

export default Home

// function formatPath(p) {
//   return p.replace(/\.md$/, '')
// }
