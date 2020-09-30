import Fuse from 'fuse.js'
import { useState, useMemo } from 'react'
import { useDebounce } from 'react-use'

function useFuse(list, { delay = 200, ...options } = {}) {
  const [term, search] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')

  const fuse = useMemo(() => new Fuse(list, options), [list, options])

  const result = useMemo(() => {
    const result = fuse.search(`${debouncedTerm}`)
    return debouncedTerm ? result?.map((r) => r.item) : list
  }, [fuse, term])

  const [, cancel] = useDebounce(() => setDebouncedTerm(term), delay, [term])

  const reset = () => search('')

  return { search, reset, term, result }
}

export default useFuse
