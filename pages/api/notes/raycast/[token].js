import Cors from 'micro-cors'
import got from 'got'
import { format } from 'date-fns'
import { isEmpty, makeYaml } from 'utils'

const RAYCAST_SCRIPT_TOKEN = process.env.RAYCAST_SCRIPT_TOKEN
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const getContent = (message) => {
  let { url, excerpt } = message

  if (isEmpty(url)) {
    throw new Error('No URL found in message')
  } else if (isEmpty(excerpt)) {
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
  const text = content.excerpt?.trim()

  const fileContent = `${frontmatter}\n\n${text}\n`
  const fileName = format(createdAt, 'yyyy-MM-dd-Hmm') + '.md'

  const url = `https://api.github.com/repos/harrisjose/harrisjose.dev/contents/notes/${fileName}`

  const payload = {
    message: 'New note via Raycast',
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
      Authorization: `token ${GITHUB_TOKEN}`,
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

const createReply = (res) => (message) =>
  res.status(200).json({
    message
  })

const handler = async (req, res) => {
  const {
    query: { token },
    body: input,
  } = req

  if (token !== RAYCAST_SCRIPT_TOKEN || isEmpty(input)) {
    console.log(token, input)
    res.status(200).json({ message: 'Invalid Request' })
  } else {
    const reply = createReply(res)


    let content = {}

    try {
      content = getContent(input)
    } catch (err) {
      reply(err.message)
      return
    }

    try {
      await createPost(content)
    } catch (err) {
      reply(`Error: ${err.message}`)
      return
    }

    reply(`Saved to notes`)
  }
}

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
})

export default cors(handler)
