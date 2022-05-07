import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Flex,
  useColorModeValue
} from '@chakra-ui/react'

import HabitBox from './HabitBox'
import IndividualHabit from './IndividualHabit'

import { updateStatus } from '../actions'

const Habits = () => {  
  const dispatch = useDispatch()
 
  const goals = useSelector(state => state.goals) // habits array from db
  const primaryFontColor = useColorModeValue('#333', 'white') // Chakra css setting
  
  useEffect(() => {
    // going through each habit from db
    goals.forEach((goal, index) => {
      return checkStatusHabit(goal, index)
    })
  }, [])
  
  function checkStatusHabit(goal) {
    const lastUpdated = goal.timestamp
    const currentDate = Date.now()
    const daysPast = (currentDate - lastUpdated) / ( 60 * 60 * 24 * 1000 )
    
    if(daysPast > 2 && goal.status == 'progress') {
      dispatch(updateStatus(goal.goal, 'failed')) // dispatch the updated status back to db
    }
  }

  //* Status arrays
  const failedArray = goals.filter(goal => goal.status == 'failed')
  const completedArray = goals.filter(goal => goal.status == 'completed')
  const progressArray = goals.filter(goal => goal.status == 'progress')


  //* Rendering

  return (
    <Flex width="100%" flexWrap="wrap" color={primaryFontColor}>
      {/* Each HabitBox maps a status array with IndividualHabit and renders as children */}
      <HabitBox
        name="In Progress"
        length={progressArray.length}
        status="progress"
      >
        {progressArray.map(({ goal, timestamp, goalCompletedAt }, idx) => {
          return (
            <IndividualHabit
              key={idx}
              goal={goal}
              timestamp={timestamp}
              goalCompletedAt={goalCompletedAt}
              status="progress"
            />
          )
        })}
      </HabitBox>
      <HabitBox name="Completed" length={completedArray.length}>
        {completedArray.map(({ goal, timestamp }, idx) => {
          return <IndividualHabit key={idx} timestamp={timestamp} goal={goal} />
        })}
      </HabitBox>
      <HabitBox name="Failed" length={failedArray.length}>
        {failedArray.map(({ goal, timestamp }, idx) => {
          return <IndividualHabit key={idx} timestamp={timestamp} goal={goal} />
        })}
      </HabitBox>
    </Flex>
  )
}

export default Habits 