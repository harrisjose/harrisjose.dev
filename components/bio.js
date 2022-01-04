import Link from 'next/link'

const Bio = ({}) => (
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
)

export default Bio
