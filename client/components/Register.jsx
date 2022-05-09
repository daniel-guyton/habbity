import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '@chakra-ui/react'
import { addUser } from '../apis/apiClient'

const Register = () => {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const [isRegistered, setIsRegistered] = useState(false)
  
  useEffect( () => {
    if (isRegistered) {
      RegisterUser()
    }
    if (user.auth0Id !== '' && !isRegistered) {
      addUser(user)
        .then(
          setIsRegistered(true)
        )
        .then(() => null)
        .catch(err => console.log(err.message))
    }
  }, [isRegistered, user])
  
  function RegisterUser() {
    if (isRegistered) {
      navigate('/', { replace: true })
    }
  }

  return (
    <div>
      <h3>creating Habbity profile for you...</h3>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </div>
  )
}

export default Register