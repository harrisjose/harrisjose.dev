import Head from 'next/head'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '../components/header.js'
import Github from '../icons/github.svg'
import Twitter from '../icons/twitter.svg'
import LinkedIn from '../icons/linkedin.svg'

const ThemeSwitcher = dynamic(() => import('../components/theme-switcher'), {
  ssr: false,
})

const Home = () => (
  <div className="flex flex-col">
    <Head>
      <title>Harris Jose</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header>
      <Link href="/blog">
        <a aria-describedby="Go to Articles">Writing</a>
      </Link>
      <Link href="/contact">
        <a aria-describedby="Go to Contact Info">Contact</a>
      </Link>
      <ThemeSwitcher></ThemeSwitcher>
    </Header>

    <main className="container max-w-screen-md mx-auto mb-40">
      <div className="mt-32">
        <h1 className="text-5xl font-bold">Hi, I'm Harris</h1>
        <div className="text-3xl font-bold mt-6 max-w-screen-sm">
          I’m a frontend engineer working on web apps at{' '}
          <a
            className="text-special"
            href="https://facilio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="Open company website in a new tab"
          >
            @FacilioInc
          </a>
        </div>
        <div className="flex mt-10">
          <a
            href="facilio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="Open twitter profile in a new tab"
          >
            <Github className="h-8 w-8 mr-8"></Github>
          </a>
          <a
            href="facilio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="Open twitter profile in a new tab"
          >
            <Twitter className="h-8 w-8 mr-8"></Twitter>
          </a>
          <a
            href="facilio.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="Open twitter profile in a new tab"
          >
            <LinkedIn className="h-8 w-8 mr-8"></LinkedIn>
          </a>
        </div>
      </div>
      <div className="mt-48 flex flex-col">
        <div className="text-2xl font-bold">Latest Articles</div>
        <div className="card horizontal w-full"></div>
        <div className="card horizontal w-full"></div>
      </div>
      <div className="mt-12 flex flex-col">
        <div className="text-2xl font-bold">Projects</div>
        <div className="flex flex-row">
          <div className="card vertical flex-1"></div>
          <div className="card vertical flex-1"></div>
          <div className="card vertical flex-1"></div>
        </div>
      </div>
    </main>

    <footer>2020 © Harris Jose</footer>
  </div>
)

export default Home
