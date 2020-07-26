import Link from 'next/link'
import dynamic from 'next/dynamic'
const ThemeSwitcher = dynamic(() => import('@/components/theme-switcher'), {
  ssr: false,
})

const Header = () => (
  <nav className="header py-5 px-8 md:px-0 -mx-8">
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
      <Link href="/about">
        <a aria-describedby="Go to About Page">About</a>
      </Link>
      <ThemeSwitcher className="ml-auto md:ml-5 cursor-pointer"></ThemeSwitcher>
    </div>
  </nav>
)

export default Header
