import React from 'react'
import { Alert } from 'react-bootstrap'


function Message({message, variant}) {
  return (
    <Alert variant={variant}>
        {message}
    </Alert>
  )
}

export default Message