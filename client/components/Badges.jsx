import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Heading, Text, Badge, Divider, Center, Image } from '@chakra-ui/react'
import { getBadge, getUserByAuth0Id } from '../apis/apiClient'


const Badges = () => {

  const user = useSelector(state => state.user)
  const [userInfo, setUserInfo] = useState(null)
  const [badges, setBadges] = useState([])
  const [getBadgeSuccess, setGetBadgeSuccess] = useState(false)

  useEffect(() => {
    if (user.auth0Id !== '' && userInfo === null) {
      getUserByAuth0Id(user)
        .then((res) => {
          setUserInfo(res)
        })
        .then(() => {
          setBadges(userInfo.badges.split(','))
        })
        .catch(err => console.log(err))
      }
    if (user.auth0Id !== '' && !getBadgeSuccess) {
      getBadge(user)
        .then((res) => {
          setBadges([...badges, res.embed_url])
        })
        .then(setGetBadgeSuccess(true))
        .catch(err => console.log(err.message))
    }
    }, [user, userInfo])
  
  const badgeStyle = {
    borderRadius: '5px',
    padding: '5px 10px 5px 10px',
    marginLeft: '20px',
    textAlign: 'center'
  }
  const giphyStyle = {
    width: '300px',
    height: '300px',
    backgroundColor: 'transparent'
  }

  const iframeStyle = {
    height: '100%',
    width: '100%'
  }

  return (
    <Box w='100%' p={4} color='teal.500'>
      <Heading as='h3' size='lg'>
        Welcome {user.name}!
        { userInfo !== null ? 
          (
          <Badge ml='1' fontSize='0.5em' colorScheme='teal' style={badgeStyle}>
            {userInfo.points} xp
          </Badge>
          ) : null
        }
      </Heading>
      <Center height='50px'>
        <Divider orientation='vertical' />
      </Center>
      <Text fontSize='3xl'>Here are some treats as a return for being a good habbitor!</Text>
      <Center height='50px'>
        <Divider orientation='vertical' />
      </Center>
      {
        badges.map((badge, index) => {
          if(getBadgeSuccess) {
            return (
            <Box key={index} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' style={giphyStyle}>
              <iframe src={badge} alt='badge GIF' style={iframeStyle} />
            </Box>
            )

          }
        })
      }
    </Box>
  )
}

export default Badges
