export function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}
export function formatPath(p) {
  return p.replace(/\/\index.mdx$/, '')
}

export function makeYaml(json) {
  let yaml = []

  yaml.push('---')
  Object.keys(json).forEach((key) => {
    if (json[key] && json[key].constructor == String) {
      yaml.push(`${key}: ${json[key]}`)
    } else if (typeof json[key] === 'boolean') {
      yaml.push(`${key}: ${String(json[key])}`)
    }
  })
  yaml.push('---')

  return yaml.join('\n')
}

export function createReply(chatId, messageId) {
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
