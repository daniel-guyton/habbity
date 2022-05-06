import React, {useEffect, useState, useRef} from 'react'
import {Box, Flex, Text, Checkbox, useColorModeValue, Button, } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { updateGoal } from '../actions'

const IndividualHabit = (props) => {
  const dispatch = useDispatch()
  const checkbox = useRef(null)
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')
  const [dayCount, setDayCount] = useState(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)



  useEffect(() => {
    isMoreThan24Hours(props.goalCompletedAt)
  }, [])

  useEffect(() => {
    const checker = setInterval(() => {
      // check if current date is greater than last check date plus (interval)
      const isReset = isMoreThan24Hours(props.goalCompletedAt)
      if (isReset && checkbox.current != null) {
        setIsChecked(false)
        checkbox.current.disabled = false
      }
      // If the day has no reset, this will keep the checkbox from being focusable
      setIsEnabled(isReset)
    }, 10000)

    return () => clearInterval(checker)
  }, [props.goalCompletedAt, checkbox])



  const handleCheckBoxClick = (e) => {
    setIsChecked(true)
    setDayCount(dayCount + 1)
    e.target.disabled = true
    // compareDates(1651371062000)  // TODO compare with a real date later for column sorting
    if(e.target.checked) {
      dispatch(updateGoal({ goalCompletedAt: Date.now() * 1000, goal: props.goal}))
    }
  }



  // TODO see line 38; for column sorting
  const compareDates = (oldTimestamp) => {
    // const oneDay = 86400 // 1 day in timestamp format
    const newTimestamp = Date.now()
    const timePlus36hrs = oldTimestamp + 60 * 60 * (24 * 2.5) * 1000 // add 2.5 days to the timestamp from db

    if (timePlus36hrs < newTimestamp) { // if user hasn't checked the habit within 36 hours
      console.log('compareDates if WIP')
    } else if (timePlus24hrs >= newTimestamp) {  // if user has checked the habit within 36 hours
      console.log('compareDates else WIP')
    }
  }



  function isMoreThan24Hours(dateTimeStamp) {
    // exit on initial render
    // TODO seeds hardcode data may be to times that don't exist yet
    if (typeof dateTimeStamp == 'undefined') {
      return false
    }
    // current time stamps
    const add60Seconds = dateTimeStamp + (60 * 1000) // TODO check maths on this?
    // 24 hours in mins
    //let date = new Date(dateTimeStamp * 1000)
    const date = Date.now() * 1000
    // const newDate = date + twentyFourHrInMs
    // const twentyFourHoursAgo = Date.now() - twentyFourHrInMs

    return date > add60Seconds
  }
  

  
  //* render

  return (
    <Flex
      alignItems="center"
      mt="4"
      mb="4"
      bg={primaryBgColor}
      borderRadius="2"
    >
      <Box
        height="var(--chakra-sizes-10)"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
        width="100%"
        p="3"
        fontSize="16"
      >
        {/* showing checkbox for the habit only if it is in progress */}
        {props.status == 'progress' && (
          <Checkbox
            pr="3"
            colorScheme="green"
            border="gray"
            ref={checkbox}
            isChecked={isChecked}
            // defaultUnchecked='true'
            onChange={handleCheckBoxClick}
            isFocusable={isEnabled}
          />
        )}
        {/* replace the {dayCount} with the useSelector called from the top */}
        <Text pl="3">{props.goal}</Text>
      </Box>
      <Text p="3" whiteSpace="nowrap">
        {dayCount}/28 Days
      </Text>
    </Flex>
  )
}

export default IndividualHabit