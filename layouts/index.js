import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Header from '../components/header.js'
import styles from './index.module.scss'

const ThemeSwitcher = dynamic(() => import('../components/theme-switcher'), {
  ssr: false,
})

export default (frontMatter) => ({ children: content }) => (
  <div className="flex flex-col">
    <Head>
      <title>{frontMatter.title} | Harris Jose</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header>
      <Link href="/">
        <a aria-describedby="Go to Home Page">Home</a>
      </Link>
      <Link href="/contact">
        <a aria-describedby="Go to Contact Info">Contact</a>
      </Link>
      <ThemeSwitcher></ThemeSwitcher>
    </Header>
    <main className={styles.article}>
      <h1>{frontMatter.title}</h1>
      {content}
    </main>
    <footer>2020 © Harris Jose</footer>
  </div>
)
