import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { addUser } from '../apis/apiClient'

const Register = (props) => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.token && !props.isRegistered) {
      addUser(user)
        .then(() => handleRegister(true))
        .catch((err) => console.error(err.message))
    }
  }, [props.isRegistered, user.token])

  function handleRegister() {
    props.onRegister(true)
    navigate('/', { replace: true })
  }

  return (
    <div>
      <h3>Signing in...</h3>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  )
}

export default Register
