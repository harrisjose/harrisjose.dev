import SpotifyIcon from '@/icons/music.svg'

const Now = ({ song = null }) => (
  <section className="mt-16">
    <h2 className="font-semibold">Now</h2>
    <div className="text-light mt-6">
      Whipping up a text editor and thinking about presentations on the web.
      Getting my hands dirty with Node.js and Rust.
    </div>
    {song && song?.name ? (
      <a
        href={song?.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby="Open music on Spotify"
        className="mt-6 text-dim flex items-center group"
      >
        <SpotifyIcon className="h-5 w-5 mr-2.5 text-green-400"></SpotifyIcon>
        <div>
          <span className="text-light group-hover:text-dark">{song?.name}</span>{' '}
          <span className="text-dim group-hover:text-light">
            - {song?.artist}
          </span>
        </div>
      </a>
    ) : (
      <div className="mt-6 text-dim flex items-center">
        <SpotifyIcon className="h-5 w-5 mr-2.5"></SpotifyIcon>
        <div className="text-sm">Not Playing</div>
      </div>
    )}
  </section>
)

export default Now
