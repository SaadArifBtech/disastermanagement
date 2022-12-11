import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const withParams = (WrappedComponent) => {
  
  return props =>{
    const navigate = useNavigate()
    return (
      <WrappedComponent {...props} navigate={navigate} params={useParams()} />
    )
  } 

}

export default withParams