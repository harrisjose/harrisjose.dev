import Cors from 'micro-cors'
import got from 'got'
import { format } from 'date-fns'
import { isEmpty, makeYaml } from 'utils'

const getContent = (message) => {
  let { entities, text } = message

  // Get url for the note
  let urlEntity = entities.find((e) => e.type === 'url')
  if (isEmpty(urlEntity)) {
    throw new Error('No URL found in message')
  }

  // Get excerpt for the note
  let { offset, length } = urlEntity
  let url = text.slice(offset, offset + length)
  let excerpt = text
    .split(url)
    .find((m) => !isEmpty(m))
    .trim()

  if (isEmpty(excerpt)) {
    throw new Error('No excerpt found in message')
  } else {
    return { url, excerpt }
  }
}

const createPost = async (content) => {
  const createdAt = Date.now()
  const frontmatter = makeYaml({
    createdAt,
    link: content.url,
    syndicated: false,
    layout: 'note',
  })
  const text = content.excerpt

  const fileContent = `${frontmatter}\n\n${text}\n`
  const fileName = format(createdAt, 'yyyy-MM-dd-Hmm') + '.md'

  const url = `https://api.github.com/repos/harrisjose/blog2/contents/notes/${fileName}`

  const payload = {
    message: 'New note via NotesBot',
    content: Buffer.from(fileContent).toString('base64'),
    committer: {
      name: 'Harris Jose',
      email: 'harrisjose@outlook.com',
    },
  }

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/vnd.github.v3+json',
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify(payload),
  }

  let response = null

  try {
    response = await got(url, options)
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }

  console.log(`Created File: ${fileName}`)
}

const createReply = (res, chatId, messageId) => (message) =>
  res.status(200).json({
    method: 'sendMessage',
    chat_id: chatId,
    text: message,
    reply_to_message_id: messageId || null,
    disable_notification: true,
  })

const handler = async (req, res) => {
  const {
    query: { token },
    body: update,
  } = req

  if (token !== process.env.LOCAL_TOKEN || isEmpty(update)) {
    console.log(token)
    res.status(500).end('Invalid Auth')
  } else {
    const { message } = update || {}
    const {
      from: { id: userId } = {},
      message_id: messageId,
      chat: { id: chatId } = {},
    } = message || {}

    const reply = createReply(res, chatId, messageId)

    if (String(userId) === process.env.USER_ID) {
      let content = {}

      try {
        content = getContent(message)
      } catch (err) {
        reply(err.message)
        return
      }

      try {
        await createPost(content)
      } catch (err) {
        reply(`Error occurred while publishing:\n\n${err.message}`)
        return
      }

      reply(`Published!`)
    } else {
      reply(
        'This is a private bot 😅. Check out harrisjose.dev to learn how to make your own.'
      )
    }
  }
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

export default cors(handler)
