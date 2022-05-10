import React, { useEffect, useState, useRef } from 'react'

import {
  Box,
  Flex,
  Text,
  Checkbox,
  useColorModeValue,
  Button
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import {updateHabit, updateProfile } from '../actions'
import { patchHabit, patchProfile } from '../apis/apiClient'

const IndividualHabit = (props) => {
  const user = useSelector((state) => state.user)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const checkbox = useRef(null)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')

  const {id, goalCompletedAt, timestamp, status, daysCompleted, goal} = props  
  //checks wether the checkbox should be ticked based no the timestamps / date.
  useEffect(() => {
    const shouldCheckboxBeTicked = isMoreThan24HoursAgo(goalCompletedAt)

    setIsEnabled(shouldCheckboxBeTicked)
    setIsChecked(!shouldCheckboxBeTicked)
  }, [])

  useEffect(() => {
    const checker = setInterval(() => {
      handleCheckboxState(goalCompletedAt)

      // getting current date & time as unix timestamp
      // converting it back to a date object for easier
      const current_date_object = new Date()

      // adds seconds to the completed date
      // convert it to date object for easier comparisons
      const initial_unix_with_seconds = timestamp + 20
      const initial_date_object = new Date(initial_unix_with_seconds * 1000)

      // adds seconds to the completed date
      // convert it to date object for easier comparisons
      const completed_unix_with_seconds = goalCompletedAt + 40
      const completed_date_object = new Date(completed_unix_with_seconds * 1000)

      const isFirstDay = goalCompletedAt === 0
      const isNotFirstDay = goalCompletedAt !== 0
      const initialTimeCheck =
        isFirstDay && initial_date_object < current_date_object
      const timeAfterCheck =
        isNotFirstDay && completed_date_object < current_date_object
      if (initialTimeCheck || timeAfterCheck) {
        patchHabit({ id: id, status: 'failed' }, user.token)
          .then(() => {
            dispatch(updateHabit({ id: id, status: 'failed' }))
          })
          .catch((err) => {
            console.error('failed to update status failed', err)
          })
      }
    }, 10000)

    return () => clearInterval(checker)
  }, [goalCompletedAt, checkbox])

  const handleCheckboxState = (goalCompletedAt) => {
    const isReset = isMoreThan24HoursAgo(goalCompletedAt)
    // check if current date is greater than last check date plus (interval)
    if (isReset && checkbox.current != null) {
      setIsChecked(false)
      checkbox.current.disabled = false
    }
    // If the day has no reset, this will keep the checkbox from being focusable
    setIsEnabled(isReset)
  }

  const handleCheckBoxClick = (e) => {
    const newDayCount = daysCompleted + 1
    const newPointCount = profile.points + 2
    // base update for clicking the checkbox
    let changes = { id: id, daysCompleted: newDayCount }

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
    patchHabit(changes, user.token)
      .then(() => {
        dispatch(updateHabit(changes))
      })
      .catch((err) => {
        console.error('unable to update changes', err)
      })

    patchProfile({id: user.id, points: newPointCount}, user.token)
    .then(() => {
      dispatch(updateProfile({ id: user.id, points: newPointCount }))
    }).catch((err) => {
      console.error('unable to update changes', err)
    })
    
  }

  function isMoreThan24HoursAgo(dateTimeStamp) {
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

  const handleButtonClick = () => {
    patchHabit({ id: id, status: 'progress' }, user.token)
      .then(() => {
        dispatch(updateHabit({ id: id, status: 'progress' }))
      })
      .catch((err) => {
        console.error('failed to update status progress', err)
      })
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
        {status == 'progress' && (
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
        {status == 'failed' && (<Button onClick={handleButtonClick}>Reset</Button>)}
        <Text pl="3">{goal}</Text>
      </Box>
      <Text p="3" whiteSpace="nowrap">
        {daysCompleted}/28 Days
      </Text>
    </Flex>
  )
}

export default IndividualHabit
