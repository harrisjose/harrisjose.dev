import { SpotifyProvider } from 'hooks/use-spotify'

const Page = ({ children }) => (
  <SpotifyProvider>
    <div className="flex flex-col px-8 min-h-screen">{children}</div>
  </SpotifyProvider>
)

export default Page
