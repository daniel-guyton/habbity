import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Heading, Text, Badge, Divider, Center } from '@chakra-ui/react'
import { getUserPointByAuth0Id } from '../apis/apiClient'


const Badges = () => {

  const user = useSelector(state => state.user)
  const [points, setPoints] = useState(null)

  useEffect(() => {
    if (user.auth0Id !== '' && points === null) {
      getUserPointByAuth0Id(user)
        .then((res) => {
          setPoints(res.points)
        })
        .catch(err => console.log(err))
    }
  }, [user, points])

  const badgeStyle = {
    borderRadius: '5px',
    padding: '5px 10px 5px 10px',
    marginLeft: '20px',
    textAlign: 'center'
  }
  const giphyStyle = {
    width: '150px',
    height: '150px',
    backgroundColor: 'black'
  }

  return (
    <Box w='100%' p={4} color='teal.500'>
      <Heading as='h3' size='lg'>
        Welcome {user.name}!
        <Badge ml='1' fontSize='0.5em' colorScheme='teal' style={badgeStyle}>
          {points} xp
        </Badge>
      </Heading>
      <Center height='50px'>
        <Divider orientation='vertical' />
      </Center>
      <Text fontSize='3xl'>Here are some treats as a return for being a good habbitor!</Text>
      <Center height='50px'>
        <Divider orientation='vertical' />
      </Center>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' style={giphyStyle}>
        {/* <Image src={property.imageUrl} alt={property.imageAlt} /> */}
      </Box>
    </Box>
  )
}

export default Badges
