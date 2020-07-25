import Cors from 'micro-cors'
import { isEmpty } from 'utils'

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

function createReply(res, chatId, messageId) {
  return (message) =>
    res.status(200).json({
      method: 'sendMessage',
      chat_id: chatId,
      text: message || `Published to harrisjose.dev/notes`,
      reply_to_message_id: messageId || null,
      disable_notification: true,
    })
}

const handler = async (req, res) => {
  const {
    query: { token },
    body: update,
  } = req

  if (token !== process.env.LOCAL_TOKEN || isEmpty(update)) {
    console.log(token)
    res.status(500).end('Invalid Auth')
  } else {
    let { message } = update || {}
    let {
      from: { id: userId } = {},
      message_id: messageId,
      chat: { id: chatId } = {},
    } = message || {}

    let reply = createReply(res, chatId, messageId)

    if (String(userId) === process.env.USER_ID) {
      let { entities, text } = message

      // Get url for the note
      let urlEntity = entities.find((e) => e.type === 'url')
      if (isEmpty(urlEntity)) {
        reply('No URL found in message')
      }

      // Get excerpt for the note
      let { offset, length } = urlEntity
      let url = text.slice(offset, offset + length)
      let excerpt = text
        .split(url)
        .find((m) => !isEmpty(m))
        .trim()

      if (isEmpty(excerpt)) {
        reply('No excerpt found in message')
      } else {
        reply()
      }
    } else {
      reply(
        'This is a private bot 😅. Checkout harrisjose.dev to figure out how to make your own.'
      )
    }
  }
}

export default cors(handler)
