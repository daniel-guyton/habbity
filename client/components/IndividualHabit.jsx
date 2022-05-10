import React, { useEffect, useState, useRef } from 'react'

import {
  Box,
  Flex,
  Text,
  Checkbox,
  useColorModeValue,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'

import { updateGoal, updateProfile } from '../actions'
import { patchHabit, patchProfile } from '../apis/apiClient'

const IndividualHabit = (props) => {
  const user = useSelector((state) => state.user)
  const profile = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const checkbox = useRef(null)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const primaryBgColor = useColorModeValue('gray.200', 'gray.700')

  // TOAST HELPERS
  // =============
  const toast = useToast()

  const toastProgress = [
    'A journey of a thousand miles starts with a single overused cliché.',
    'A little better than we were yesterday.',
    'Another day, a stronger line of thought.',
    'Any progress is progress, no matter how small.',
    'Better, stronger, faster, wiser.',
    "Can't ride waterslides without first climbing ladders.",
    'Driven to keep being better.',
    'Every day is progress; all progress is success.',
    'Every step of the way.',
    'Fresh green leaves unfurl to reach the sun.',
    'Growing into a more vibrant you.',
    'Keep up the great work!',
    'One day, this can be almost effortless.',
    'One foot in front of the other.',
    'One more step towards being who you choose to be.',
    'Reaching for a better tomorrow.',
    'Step by step.',
    'Thanks for being here - and see you tomorrow ~♥',
    'The more we do it, the easier it gets.',
    "You're doing it!",
  ]
  const toastSucceed = [
    "It's official - that's a habit! Great work staying dedicated. Making a habit takes effort and you've put in plenty!",
    'Piece by piece, we build ourselves up. Better than we were before!',
    "That's a victory! Celebrate your efforts with your favourite song. It's hard work being that kickass.",
    "Time to commemorate twenty-eight days - let's bronze that one for you!",
  ]
  const toastFailed = [
    'Growth takes effort. And your effort thus far is still valid.',
    "It's not about where you think a person SHOULD be - it's about where you'd like YOURSELF to be.",
    "Life happens. We're here when you're ready.",
    'No shame in giving in, only in giving up.',
    'Nobody walks the first time they learn to stand.',
    "What you've learned stays with you, for the next time you want to try.",
    "Win by an inch, or by a mile - it's a still a win. We can start small.",
  ]

  function toastHelper(arrMessages, statusStr = 'success') {
    const toastMsg = arrMessages[Math.floor(Math.random() * arrMessages.length)]
    console.log(`toastMsg:`, toastMsg) // TODO confirm if string is fetched
    toast({
      description: toastMsg,
      status: statusStr,
      duration: 9000,
      isClosable: true,
    })
  }
  // =============

  const { id, goalCompletedAt, timestamp, status, daysCompleted, goal } = props
  //checks whether the checkbox should be ticked based on the timestamps / date.
  useEffect(() => {
    const shouldCheckboxBeTicked = isMoreThan24HoursAgo(goalCompletedAt)

    setIsEnabled(shouldCheckboxBeTicked)
    setIsChecked(!shouldCheckboxBeTicked)
  }, [])

  useEffect(() => {
    const checker = setInterval(() => {
      handleCheckboxState(goalCompletedAt)

      // getting current date & time as unix timestamp
      // converted into a Date object for handling
      const current_date_object = new Date()
      // adds seconds to the previous completed date
      const initial_unix_with_seconds = timestamp + 20
      const initial_date_object = new Date(initial_unix_with_seconds * 1000)
      // adds seconds to the updated completed date
      const completed_unix_with_seconds = goalCompletedAt + 40
      const completed_date_object = new Date(completed_unix_with_seconds * 1000)

      const isFirstDay = goalCompletedAt === 0
      const isNotFirstDay = goalCompletedAt !== 0
      const initialTimeCheck =
        isFirstDay && initial_date_object < current_date_object
      const timeAfterCheck =
        isNotFirstDay && completed_date_object < current_date_object
      if (initialTimeCheck || timeAfterCheck) {
        //* toast for if a task has been updated to failed
        toastHelper(toastFailed, 'info')
        patchHabit({ id: id, status: 'failed' }, user.token)
          .then(() => {
            dispatch(updateGoal({ id: id, status: 'failed' }))
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
    // If the day has not reset, this will keep the checkbox from being focusable
    setIsEnabled(isReset)
  }

  const handleCheckBoxClick = (e) => {
    const newDayCount = daysCompleted + 27
    const newPointCount = profile.points + 2
    // base update for clicking the checkbox
    let changes = { id: id, daysCompleted: newDayCount }

    setIsChecked(true)
    //if goal is completed change status property
    if (newDayCount > 27) {
      changes.status = 'completed'
      toastHelper(toastSucceed)
    } else {
      toastHelper(toastProgress)
    }

    e.target.disabled = true
    if (e.target.checked) {
      changes.goalCompletedAt = Math.floor(new Date().getTime() / 1000)
    }

    //updating all the changes
    patchHabit(changes, user.token)
      .then(() => {
        dispatch(updateGoal(changes))
      })
      .catch((err) => {
        console.error('unable to update changes', err)
      })

    patchProfile({ id: user.id, points: newPointCount }, user.token)
      .then(() => {
        dispatch(updateProfile({ id: user.id, points: newPointCount }))
      })
      .catch((err) => {
        console.error('unable to update changes', err)
      })
  }

  function isMoreThan24HoursAgo(dateTimeStamp) {
    // exit on initial render
    if (typeof dateTimeStamp == 'undefined') {
      return false
    }

    // getting current date & time as unix timestamp
    const current_date_unix = Math.floor(new Date().getTime() / 1000)
    const current_date_object = new Date(current_date_unix * 1000)

    // adds seconds to the completed date
    const completed_unix_with_seconds = dateTimeStamp + 20
    const completed_date_object = new Date(completed_unix_with_seconds * 1000)

    return current_date_object > completed_date_object
  }

  const handleButtonClick = () => {
    patchHabit({ id: id, status: 'progress' }, user.token)
      .then(() => {
        dispatch(updateGoal({ id: id, status: 'progress' }))
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
        {status == 'failed' && (
          <Button onClick={handleButtonClick}>Reset</Button>
        )}
        <Text pl="3">{goal}</Text>
      </Box>
      <Text p="3" whiteSpace="nowrap">
        {daysCompleted}/28 Days
      </Text>
    </Flex>
  )
}

export default IndividualHabit
