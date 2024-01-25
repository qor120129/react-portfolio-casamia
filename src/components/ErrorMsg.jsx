import React from 'react'

const ErrorMsg = ({ error }) => {
  return (
    error && error.length > 0 && <span className="text-[0.75rem] text-red-500">{error}</span>
  )
}

export default ErrorMsg