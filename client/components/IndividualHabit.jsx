import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Flex,
  Text,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { updateGoal} from '../actions'
import { patchHabit } from '../apis/apiClient'

const IndividualHabit = (props) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const checkbox = useRef(null)
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')
  const [isEnabled, setIsEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)

  //checks wether the checkbox should be ticked based no the timestamps / date.
  useEffect(() => {
    const shouldCheckboxBeTicked = isMoreThan24Hours(props.goalCompletedAt)

    setIsEnabled(shouldCheckboxBeTicked)
    setIsChecked(!shouldCheckboxBeTicked)
  }, [])

  useEffect(() => {
    const checker = setInterval(() => {
      handleCheckboxState(props.goalCompletedAt)


      // getting current date & time as unix timestamp
      // converting it back to a date object for easier
      const current_date_object = new Date()

      // adds seconds to the completed date
      // convert it to date object for easier comparisons
      const initial_unix_with_seconds = props.timestamp + 20
      const initial_date_object = new Date(initial_unix_with_seconds * 1000)

      // adds seconds to the completed date
      // convert it to date object for easier comparisons
      const completed_unix_with_seconds = props.goalCompletedAt + 40
      const completed_date_object = new Date(completed_unix_with_seconds * 1000)

      const isFirstDay = props.goalCompletedAt === 0
      const isNotFirstDay = props.goalCompletedAt !== 0
      const initialTimeCheck = isFirstDay && initial_date_object < current_date_object
      const timeAfterCheck = isNotFirstDay && completed_date_object < current_date_object
      if (initialTimeCheck || timeAfterCheck) {
        patchHabit({id: props.id, status: 'failed'}, user.token)
        .then(() => {
          dispatch(updateGoal({id: props.id, status: 'failed'}))
        }).catch((err) => {
          console.error('failed to update status failed', err)
        })
      }
    }, 10000)

    return () => clearInterval(checker)
  }, [props.goalCompletedAt, checkbox])

  const handleCheckboxState = (goalCompletedAt) => {
    const isReset = isMoreThan24Hours(goalCompletedAt)
    // check if current date is greater than last check date plus (interval)
    if (isReset && checkbox.current != null) {
      setIsChecked(false)
      checkbox.current.disabled = false
    }
    // If the day has no reset, this will keep the checkbox from being focusable
    setIsEnabled(isReset)
  }

  const handleCheckBoxClick = (e) => {
    const newDayCount = props.daysCompleted + 1

    // base update for clicking the checkbox
    let changes = { id: props.id, daysCompleted: newDayCount }

    setIsChecked(true)
    //if goal is completed change status property
    if (newDayCount > 27) {
      changes.status = 'completed'
    }

    e.target.disabled = true
    // compareDates(1651371062000)  // TODO compare with a real date later for column sorting
    // update the current time at which it's clicked
    if (e.target.checked) {
      changes.goalCompletedAt = Math.floor(new Date().getTime() / 1000)
    }

    //updating all the changes
    patchHabit(changes, user.token).then(() => {
      dispatch(updateGoal(changes))
    }).catch((err) => {
      console.error('unable to update changes', err)
    })
  }

  function isMoreThan24Hours(dateTimeStamp) {
    // exit on initial render
    // TODO seeds hardcode data may be to times that don't exist yet
    if (typeof dateTimeStamp == 'undefined') {
      return false
    }

    // getting current date & time as unix timestamp
    // converting it back to a date object for easier
    const current_date_unix = Math.floor(new Date().getTime() / 1000)
    const current_date_object = new Date(current_date_unix * 1000)

    // adds seconds to the completed date
    // convert it to date object for easier comparisons
    const completed_unix_with_seconds = dateTimeStamp + 20
    const completed_date_object = new Date(completed_unix_with_seconds * 1000)

    return current_date_object > completed_date_object
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
            onChange={isEnabled && handleCheckBoxClick}
            isFocusable={isEnabled}
          />
        )}
        {/* replace the {dayCount} with the useSelector called from the top */}
        <Text pl="3">{props.goal}</Text>
      </Box>
      <Text p="3" whiteSpace="nowrap">
        {props.daysCompleted}/28 Days
      </Text>
    </Flex>
  )
}

export default IndividualHabit
