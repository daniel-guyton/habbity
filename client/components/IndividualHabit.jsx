import React, {useState} from 'react'
import {Box, Flex, Text, Checkbox, useColorModeValue, Button, } from '@chakra-ui/react'

const IndividualHabit = (props) => {
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')
  let [dayCount, setDayCount] = useState(0)
  const handleCheckBoxClick = (e) => {
    console.log(e.target)
    setDayCount(dayCount += 1)
    e.target.disabled = true
  }
  
  console.log(dayCount)


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