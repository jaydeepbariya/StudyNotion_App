import React from 'react'

const GradientText = ({children}) => {
  return (
    <span className={`bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-blue-200`}>{children}</span>
  )
}

export default GradientText