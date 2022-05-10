import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Box,
  Heading,
  Text,
  Badge,
  Divider,
  Center,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { getBadge, getUserByAuth0Id } from '../apis/apiClient'

const Badges = () => {
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user)
  const [userInfo, setUserInfo] = useState(null)
  const [badges, setBadges] = useState([])
  const [getBadgeSuccess, setGetBadgeSuccess] = useState(0)
  const [newBadgeToGet, setNewBadgeToGet] = useState(0)

  useEffect(() => {
    if (token) {
      getUserByAuth0Id(token)
        .then((res) => {
          console.log(res)
          setUserInfo(res)
        })
        .catch((err) => console.log('getUserByAuth0Id', err.message))
    }
  }, [token])

  useEffect(() => {
    console.log(userInfo)
    userInfo?.badges.length > 0 && setBadges(userInfo.badges.split(','))
  }, [userInfo?.badges])

  useEffect(() => {
    userInfo !== null && calculatePoints(userInfo.points)
  }, [badges])

  useEffect(() => {
    if (newBadgeToGet > 0) {
      if (getBadgeSuccess <= newBadgeToGet) {
        getBadge(user)
          .then((res) => {
            setBadges([...badges, res.embed_url])
            setGetBadgeSuccess(getBadgeSuccess + 1)
          })
          .catch((err) => console.log('getBadge', err.message))
      }
    }
  }, [newBadgeToGet, getBadgeSuccess])

  const calculatePoints = (num) => {
    const badgeToBeAwarded = Math.round(Math.floor(num / 2))
    const badgeAwarded = badges.length
    setNewBadgeToGet(badgeToBeAwarded - badgeAwarded)
  }

  const badgeStyle = {
    borderRadius: '5px',
    padding: '5px 10px 5px 10px',
    marginLeft: '20px',
    textAlign: 'center',
  }
  const giphyStyle = {
    width: '300px',
    height: '300px',
    backgroundColor: 'transparent',
  }

  const iframeStyle = {
    height: '100%',
    width: '100%',
  }

  console.log(badges)

  return (
    <Box w="100%" p={4} color="teal.500">
      <Heading as="h3" size="lg">
        Welcome {user.name}!
        {userInfo !== null ? (
          <Badge ml="1" fontSize="0.5em" colorScheme="teal" style={badgeStyle}>
            {userInfo.points} xp
          </Badge>
        ) : null}
      </Heading>
      <Center height="50px">
        <Divider orientation="vertical" />
      </Center>
      <Text fontSize="3xl">
        Here are some treats as a return for being a good habbitor!
      </Text>
      <Center height="50px">
        <Divider orientation="vertical" />
      </Center>
      <Flex style={{ flexWrap: 'wrap' }}>
        {badges &&
          badges.length !== 0 &&
          badges.map((badge, index) => {
            return (
              <>
                <Box
                  key={index}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  style={giphyStyle}
                >
                  <iframe src={badge} alt="badge GIF" style={iframeStyle} />
                </Box>
                <Spacer />
              </>
            )
          })}
      </Flex>
    </Box>
  )
}

export default Badges
