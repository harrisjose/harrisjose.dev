import Cors from 'micro-cors'
import { getCurrentPlaying } from 'utils/spotify'

const handler = async (_, res) => {
  try {
    const response = await getCurrentPlaying()
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
}

const cors = Cors({
  allowMethods: ['GET', 'HEAD'],
})

export default cors(handler)
