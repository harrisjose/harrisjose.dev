import Github from '@/icons/github.svg'
import Twitter from '@/icons/twitter.svg'
import LinkedIn from '@/icons/linkedin.svg'

const SocialHeader = () => (
  <div className="flex mt-8">
    <a
      href="https://github.com/harrisjose"
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="Open twitter profile in a new tab"
    >
      <Github className="h-6 w-6 mr-6"></Github>
    </a>
    <a
      href="https://twitter.com/harrispjose"
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="Open twitter profile in a new tab"
    >
      <Twitter className="h-6 w-6 mr-6"></Twitter>
    </a>
    <a
      href="https://www.linkedin.com/in/harrisjose"
      target="_blank"
      rel="noopener noreferrer"
      aria-describedby="Open twitter profile in a new tab"
    >
      <LinkedIn className="h-6 w-6 mr-6"></LinkedIn>
    </a>
  </div>
)

export default SocialHeader
