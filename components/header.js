import Link from 'next/link'
import dynamic from 'next/dynamic'
import Polywork from '@/icons/polywork.svg'

const ThemeSwitcher = dynamic(() => import('@/components/theme-switcher'), {
  ssr: false,
})

const Header = () => (
  <nav className="header py-5 px-8 md:px-0 -mx-8 z-10">
    <div className="max-w-screen-md mx-auto flex items-center justify-start md:justify-end">
      <Link href="/">
        <a aria-describedby="Go to Home Page">Home</a>
      </Link>
      <Link href="/blog">
        <a aria-describedby="Go to Articlles">Blog</a>
      </Link>
      <Link href="/notes">
        <a aria-describedby="Go to Notes">Notes</a>
      </Link>

      <a
        href="https://work.harrisjose.dev"
        aria-describedby="Go to About Page"
        className="flex items-center text-lg font-medium"
      >
        <Polywork className="h-4 w-4 mr-2" />
        Polywork
      </a>
      <ThemeSwitcher className="ml-auto md:ml-5 cursor-pointer"></ThemeSwitcher>
    </div>
  </nav>
)

export default Header
