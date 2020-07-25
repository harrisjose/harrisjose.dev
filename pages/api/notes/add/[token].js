import { isEmpty } from 'utils'
import got from 'got'

function createReply(chatId, messageId) {
  const reply = async (message) => {
    let { body } = await got.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        json: {
          chat_id: chatId,
          text: message,
          reply_to_message_id: messageId || null,
          disable_web_page_preview: true,
          disable_notification: true,
        },
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return body
  }
  return reply
}

export default async (req, res) => {
  const {
    query: { token },
    body: update,
  } = req

  if (String(token) !== process.env.LOCAL_TOKEN || isEmpty(update)) {
    res.status(500).end()
  } else {
    let { message } = update || {}
    let {
      from: { id: userId } = {},
      message_id: messageId,
      chat: { id: chatId } = {},
    } = message || {}

    let reply = createReply(chatId, messageId)
    let response = null

    if (String(userId) === process.env.USER_ID) {
      let { entities, text } = message

      // Get url for the note
      let urlEntity = entities.find((e) => e.type === 'url')
      if (isEmpty(urlEntity)) {
        response = await reply('No URL found in message')
      }

      // Get excerpt for the note
      let { offset, length } = urlEntity
      let url = text.slice(offset, offset + length)
      let excerpt = text
        .split(url)
        .find((m) => !isEmpty(m))
        .trim()

      if (isEmpty(excerpt)) {
        response = await reply('No excerpt found in message')
      } else {
        response = await reply('Published')
      }

      res.status(200).json(response)
    } else {
      // If I did not send the message
      response = await reply('This is a private bot 😅')
      res.status(200).end()
    }
  }
}
