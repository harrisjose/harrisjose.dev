import Link from 'next/link'
import { format } from 'date-fns'
import { isEmpty } from 'utils'
import React, { useRef } from 'react'
import useSearch from 'hooks/use-search'
import { NOTES, getNoteSlug, getMdx } from 'utils/mdx'

import Head from '@/components/head'
import Page from '@/components/page'
import Contact from '@/components/contact'
import Now from '@/components/now'
import Twitter from '@/icons/twitter.svg'
import Github from '@/icons/github.svg'
import SeachIcon from '@/icons/search.svg'
import CloseIcon from '@/icons/close-r.svg'
import styles from './notes.module.scss'

export function getStaticProps() {
  const notes = NOTES.map((filePath) => {
    const { data } = getMdx(filePath)

    return {
      ...data,
      slug: getNoteSlug(filePath),
    }
  })

  return { props: { notes } }
}

const getIcon = (url = '') => {
  let isTwitter = url.includes('twitter.com')
  let isGH = url.includes('github.com')
  let Icon = isTwitter ? Twitter : isGH ? Github : null
  return Icon ? <Icon className="h-4 w-4 mr-2 inline opacity-75" /> : ''
}

const Home = ({ notes }) => {
  const list = notes.sort(
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

      <main className="container max-w-screen-sm mx-auto mb-16">
        <div className="mt-20">
          <h1 className="text-lg font-semibold">Notes</h1>
          <div className={`${styles.seachInput}`} ref={searchInputRef}>
            <input
              type="text"
              value={term}
              placeholder="Search"
              onChange={(event) => search(event.target.value)}
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

        <div className="mt-8 grid grid-cols-split gap-x-9 gap-y-9">
          {result.map((note) => (
            <React.Fragment key={note.slug}>
              <div className="text-dim">{format(note.date, 'dd/MM/yyyy')}</div>
              <div className={styles.note} id={note.slug}>
                <div dangerouslySetInnerHTML={{ __html: note.excerpt }}></div>
                <div className="mt-4 w-full truncate">
                  <span className="ml-auto">{getIcon(note.link)}</span>
                  <a
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-dim hover:text-light"
                  >
                    {note.link}
                  </a>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <section className="mt-20">
          <Link href="/">
            <a className="text-lg font-semibold">Harris Jose</a>
          </Link>
          <div className="text-light">
            Software Engineer at{' '}
            <a
              href="https://chroniclehq.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-describedby="Open company website in a new tab"
              className="underline hover:text-dark"
            >
              Chronicle HQ
            </a>
            .
          </div>
        </section>

        <Contact />

        <Now />
      </main>
    </Page>
  )
}

export default Home
