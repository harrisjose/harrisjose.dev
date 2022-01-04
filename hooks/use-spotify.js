import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from 'react'
import { isEmpty } from 'utils'

const REFRESH_BUFFER = 2 * 60 * 1000

const mock = { name: null, artist: null, url: null }

const spotifyContext = createContext({ ...mock })

function useSpotifyProvider() {
  const [song, setSong] = useState({ ...mock })

  const fetchCurrentPlaying = async () => {
    try {
      const data = await (await fetch('/api/meta/playing')).json()
      setSong(data)
    } catch (e) {
      setSong({ ...mock })
    }
  }

  useEffect(async () => {
    if (isEmpty(song?.name)) fetchCurrentPlaying()
  }, [])

  const timer = useRef(null)

  useEffect(() => {
    timer.current = setTimeout(() => fetchCurrentPlaying(), REFRESH_BUFFER)
    return () => clearTimeout(timer.current)
  }, [song])

  return song
}

export function SpotifyProvider({ children }) {
  const auth = useSpotifyProvider()

  return (
    <spotifyContext.Provider value={auth}>{children}</spotifyContext.Provider>
  )
}

export const useNowPlaying = () => {
  return useContext(spotifyContext)
}
