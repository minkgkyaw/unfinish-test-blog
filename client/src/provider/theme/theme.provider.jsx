import React from 'react'
import { useSelector } from 'react-redux'

const ThemeProvider = ({children}) => {
  const theme = useSelector(state => state.theme)
  if(theme === 'dark') {
    document.body.classList.add(theme)
  } else {
    document.body.classList.remove('dark')
  }
  return children
}

export default ThemeProvider