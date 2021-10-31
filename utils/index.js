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
    if (
      json[key] &&
      (json[key].constructor == String || json[key].constructor === Number)
    ) {
      yaml.push(`${key}: ${json[key]}`)
    } else if (typeof json[key] === 'boolean') {
      yaml.push(`${key}: ${String(json[key])}`)
    }
  })
  yaml.push('---')

  return yaml.join('\n')
}
