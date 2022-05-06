import React, {useState} from 'react'
import {Box, Flex, Text, Checkbox, useColorModeValue } from '@chakra-ui/react'

const IndividualHabit = (props) => {
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700') // Chakra css
  let [dayCount, setDayCount] = useState(0) // useSelector for days

  const handleCheckBoxClick = (e) => {
    setDayCount(dayCount += 1) // dispatching +1 day back to db
    e.target.disabled = true
    // compareDates(1651371062000)  
  }
  
  // const compareDates = (oldTimestamp) => {
  //   const newTimestamp = Date.now()
  //   const timePlus36hrs = oldTimestamp + 60 * 60 * (24 * 2.5) * 1000 // add 2.5 days to the timestamp from db

  //   if (timePlus36hrs < newTimestamp) { // if user hasn't checked the habit within 36 hours
  //     console.log('to continue')
  //   } else if (timePlus24hrs >= newTimestamp) {  // if user has checked the habit within 36 hours
  //     console.log('in progress')
  //   }
  // }

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
      {/* showing checkbox for the habit only if it is in progress */}
      {props.status == 'progress' ? <Checkbox pr="3" colorScheme="green" border='gray' defaultunchecked='true' onChange={handleCheckBoxClick} isDisabled={false}/> : null}

        <Text pl="3">{props.goal}</Text>
      </Box>
      {/* replace the {dayCount} with the useSelector called from the top */}
      <Text p="3" whiteSpace="nowrap">{dayCount}/28 Days</Text>
      </Flex>
  )
}

export default IndividualHabit