import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Twitter from '@/icons/twitter.svg'
import LinkIcon from '@/icons/link.svg'
import { format } from 'date-fns'
import { frontMatter } from './notes/*.md'
import styles from './notes.module.scss'

const getIcon = (url = '') => {
  let isTwitter = url.includes('twitter.com')
  let Icon = isTwitter ? Twitter : LinkIcon
  return <Icon className="h-4 w-4 mr-1 inline" />
}

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
        <div className="mt-12 md:mt-24">
          <h1 className="text-5xl font-semibold">Notes</h1>
        </div>
        <div className={styles.notes}>
          {list.map((note) => (
            <a
              href={note.link}
              key={note.__resourcePath}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-10 cursor-pointer block bg-dark relative ${styles.note}`}
            >
              <div className="text-sm font-light text-light mb-8 flex">
                {format(note.createdAt, 'MMMM dd, yyyy')}
                <span className="ml-auto">{getIcon(note.link)}</span>
              </div>
              <div
                className="text-"
                dangerouslySetInnerHTML={{ __html: note.excerpt }}
              ></div>
              <div className="mt-5 flex justify-between">
                <div className="text-link inline-block truncate flex-shrink">
                  <span className="link ">{note.link}</span>
                </div>
              </div>
            </a>
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
