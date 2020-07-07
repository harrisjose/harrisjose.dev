import React, { useState, useEffect } from 'react'
import Moon from '../icons/moon.svg'
import Sun from '../icons/sun.svg'

const ThemeSwitcher = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const [isDark, setDark] = useState(mediaQuery.matches)
  const handler = ({ matches }) => setDark(matches)

  useEffect(() => {
    document
      .querySelector('body')
      .setAttribute('data-theme', isDark ? 'dark' : 'light')

    mediaQuery.addListener(handler)
    return () => mediaQuery.removeListener(handler)
  }, [isDark])

  const icon = isDark ? <Sun></Sun> : <Moon></Moon>
  return (
    <div onClick={() => setDark(!isDark)} className="mt-1">
      {icon}
    </div>
  )
}

export default ThemeSwitcher
