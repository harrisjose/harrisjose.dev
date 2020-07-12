import React, { useState, useEffect } from 'react'
import { isEmpty } from './utils'
import Moon from '../icons/moon.svg'
import Sun from '../icons/sun.svg'

const ThemeSwitcher = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const preference = localStorage.getItem('hpj-theme')
  const isDarkPreferred = !isEmpty(preference)
    ? preference === 'dark'
    : mediaQuery.matches

  const [isDark, setDark] = useState(isDarkPreferred)

  useEffect(() => {
    let theme = isDark ? 'dark' : 'light'

    localStorage.setItem('hpj-theme', theme)
    document.querySelector('body').setAttribute('data-theme', theme)

    const handler = ({ matches }) => setDark(matches)

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
