import React, {useState} from 'react'
import {Box, Flex, Text, Checkbox, useColorModeValue, Button, } from '@chakra-ui/react'

const IndividualHabit = (props) => {
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')
  let [dayCount, setDayCount] = useState(0)
  const handleCheckBoxClick = (e) => {
    setDayCount(dayCount += 1)
    e.target.disabled = true
    compareDates(1651371062000)  
  }
  
  const compareDates = (oldTimestamp) => {
    // const oneDay = 86400 // 1 day in timestamp format
    const newTimestamp = Date.now()
    const timePlus36hrs = oldTimestamp + 60 * 60 * (24 * 2.5) * 1000 // add 2.5 days to the timestamp from db

    if (timePlus36hrs < newTimestamp) { // if user hasn't checked the habit within 36 hours
      console.log('to continue')
    } else if (timePlus24hrs >= newTimestamp) {  // if user has checked the habit within 36 hours
      console.log('in progress')
    }
  }

  return (
      <Flex alignItems="center" mt="4" mb="4" bg={primaryBgColor} borderRadius="2">
      <Box
        height="var(--chakra-sizes-10)"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        p='3'
        fontSize='16'
      >
        <Checkbox pr="3" colorScheme="green" border='gray' defaultunchecked='true' onChange={handleCheckBoxClick} isDisabled={false}/>

        <Text pl="3">{props.goal}</Text>
      </Box>
      <Text p="3" whiteSpace="nowrap">{dayCount}/28 Days</Text>
      </Flex>
  )
}

export default IndividualHabit