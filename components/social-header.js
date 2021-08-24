import Github from '@/icons/github.svg'
import Twitter from '@/icons/twitter.svg'
import LinkedIn from '@/icons/linkedin.svg'

const SocialHeader = () => (
  <div className="flex mt-8 items-center">
    <a
      href="https://github.com/harrisjose"
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="Open github profile in a new tab"
      className="flex mr-6 items-center text-sm"
    >
      <Github className="h-5 w-5 m-2"></Github>
      Github
    </a>
    <a
      href="https://twitter.com/harrispjose"
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="Open twitter profile in a new tab"
      className="flex mr-6 items-center text-sm"
    >
      <Twitter className="h-5 w-5 m-2"></Twitter>
      Twitter
    </a>
    <a
      href="https://www.linkedin.com/in/harrisjose"
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="Open linked-in profile in a new tab"
      className="flex mr-6 items-center text-sm"
    >
      <LinkedIn className="h-5 w-5 m-2"></LinkedIn>
      LinkedIn
    </a>
  </div>
)

export default SocialHeader
