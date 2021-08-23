import Head from '@/components/head'
import Page from '@/components/page'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Twitter from '@/icons/twitter.svg'
import LinkIcon from '@/icons/link.svg'
import SeachIcon from '@/icons/search.svg'
import CloseIcon from '@/icons/close-r.svg'

import { format } from 'date-fns'
import { isEmpty } from 'utils'
import { useRef } from 'react'
import useSearch from 'hooks/use-search'

import { frontMatter } from './notes/*.md'
import styles from './notes.module.scss'

const getIcon = (url = '') => {
  let isTwitter = url.includes('twitter.com')
  let Icon = isTwitter ? Twitter : LinkIcon
  return <Icon className="h-4 w-4 mr-1 inline opacity-75" />
}

const Home = () => {
  const list = [...frontMatter].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  const { search, reset, term, result } = useSearch(list, {
    keys: ['excerpt', 'link'],
  })

  const isSearchActive = !isEmpty(term)

  const searchInputRef = useRef(null)

  return (
    <Page>
      <Head>
        <title>Notes | Harris Jose</title>
      </Head>
      <Header />

      <main className="container max-w-screen-md mx-auto mb-16">
        <div className="aurora"></div>

        <div className="mt-12 md:mt-24">
          <h1 className="text-5xl font-semibold flex">Notes</h1>
          <div className={`${styles.seachInput}`} ref={searchInputRef}>
            <input
              type="text"
              value={term}
              placeholder="Search"
              onChange={(event) => search(event.target.value)}
              className="bg-frost"
            ></input>

            {isSearchActive ? (
              <span
                className="text-light cursor-pointer"
                onClick={() => reset()}
              >
                <CloseIcon />
              </span>
            ) : (
              <span className="text-light">
                <SeachIcon />
              </span>
            )}
          </div>
        </div>
        <div className={styles.notes}>
          {result.map((note) => (
            <a
              href={note.link}
              key={note.__resourcePath}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-frost flex flex-col ${styles.note}`}
            >
              <div className="text-sm font-light text-light mb-8 flex">
                {format(note.createdAt, 'MMMM dd, yyyy')}
                <span className="ml-auto">{getIcon(note.link)}</span>
              </div>
              <div
                className="md:text-lg"
                dangerouslySetInnerHTML={{ __html: note.excerpt }}
              ></div>
              <div className="text-link inline-block truncate mt-4 flex-shrink">
                <span className="link ">{note.link}</span>
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
