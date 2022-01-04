import Link from 'next/link'
import dynamic from 'next/dynamic'
import ArrowIcon from '@/icons/arrow-left.svg'
import RssIcon from '@/icons/rss.svg'

const ThemeSwitcher = dynamic(() => import('@/components/theme-switcher'), {
  ssr: false,
})

const Navigation = ({ className }) => (
  <nav
    className={`hidden md:flex md:flex-col md:fixed gap-y-4 left-4 text-dim ${className}`}
  >
    <Link href={'/'}>
      <ArrowIcon className="w-6 h-6 cursor-pointer hover:text-light" />
    </Link>
    <Link href={'/'}>
      <RssIcon className="w-5 h-5 cursor-pointer hover:text-light" />
    </Link>
    <ThemeSwitcher className="ml-auto md:ml-0 cursor-pointer hover:text-light"></ThemeSwitcher>
  </nav>
)

export default Navigation
