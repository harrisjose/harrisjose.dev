import got from 'got'

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

const basic = Buffer.from(
  `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
).toString('base64')

export const getAccessToken = async () => {
  const response = await got
    .post(TOKEN_ENDPOINT, {
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token: SPOTIFY_REFRESH_TOKEN,
      },
    })
    .json()

  return response
}

export const getCurrentPlaying = async () => {
  const { access_token } = await getAccessToken()

  const data = await got(NOW_PLAYING_ENDPOINT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).json()

  return {
    name: data?.item?.name || null,
    artist: data?.item?.artists?.[0].name || 'Unknown',
    url: data?.item?.external_urls?.['spotify'] || null,
  }
}
