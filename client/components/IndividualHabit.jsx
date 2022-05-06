import React, {useEffect, useState, useRef} from 'react'
import {Box, Flex, Text, Checkbox, useColorModeValue, Button, } from '@chakra-ui/react'
import { updateGoal } from '../actions'
import { useDispatch } from 'react-redux'

const IndividualHabit = (props) => {
  const dispatch = useDispatch()
  const checkbox = useRef(null)
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')
  let [dayCount, setDayCount] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckBoxClick = (e) => {
    setIsChecked(true)
    setDayCount(dayCount += 1)
    e.target.disabled = true

    compareDates(1651371062000)  
    if(e.target.checked) {
      dispatch(updateGoal({ goalCompletedAt: Date.now() * 1000, goal: props.goal}))
    }
  }
  useEffect(() => {isMoreThan24Hours(props.goalCompletedAt)}, [])
  useEffect(() => {
    const checker = setInterval(() => {
      const isCompleted = isMoreThan24Hours(props.goalCompletedAt)
      if (isCompleted) {
        setIsChecked(false)
        checkbox.current.disabled = false
      }
      setIsDisabled(isCompleted)
    }, 10000)

    return () => clearInterval(checker)
  }, [props.goalCompletedAt, checkbox])
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

  function isMoreThan24Hours(dateTimeStamp) {
    // current time stamps
    const add60Seconds = dateTimeStamp + 60 * 1000
    // 24 hours in mins
    let date = new Date(dateTimeStamp * 1000)
    // const newDate = date + twentyFourHrInMs
    // dispatch(updateGoal(newDate))
    // const twentyFourHoursAgo = Date.now() - twentyFourHrInMs
    // console.log(date, add60Seconds)
    return date > add60Seconds
  }
  

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
        {props.status == 'progress' ? (
          <Checkbox
            pr="3"
            colorScheme="green"
            border="gray"
            ref={checkbox}
            isChecked={isChecked}
            // defaultunchecked='true'
            onChange={handleCheckBoxClick}
            isFocusable={isDisabled}
          />
        ) : null}

        <Text pl="3">{props.goal}</Text>
      </Box>
      <Text p="3" whiteSpace="nowrap">
        {dayCount}/28 Days
      </Text>
    </Flex>
  )
}

export default IndividualHabit