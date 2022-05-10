import React from 'react'
import { Box, Flex, Button, Stack, useColorModeValue } from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'

const Home = () => {
  return (
    <Box>
      <WithSubnavigation />
      <img
        src="/client/public/designs/Habbity.png"
        alt="Habbity"
        style={{
          margin: '20vh auto 0 auto',
        }}
      />
    </Box>
  )
}

const WithSubnavigation = () => {
  const { loginWithRedirect } = useAuth0()

  const signUpHandler = (e) => {
    e.preventDefault()
    loginWithRedirect({ redirectUri: `${window.location.origin}/register` })
  }

  return (
    <Box>
      <Flex
        bg={'green.50'}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Stack
          style={{ margin: '0 auto 0 auto' }}
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          gap={'80px'}
          direction={'row'}
          spacing={6}
        >
          <Button
            onClick={signUpHandler}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'green.800'}
            href={'#'}
            _hover={{
              bg: 'teal.400',
            }}
          >
            Sign In
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Home
