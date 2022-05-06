import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { statement_timeout } from 'pg/lib/defaults'
import {
  Box,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'


import { updateStatus } from '../actions'
import IndividualHabit from './IndividualHabit'
import AddHabit from './AddHabit'
import HabitBox from './HabitBox'
// import AchievedHabits from './AchievedHabits'


const Habits = () => {  
  const dispatch = useDispatch()

  const goals = useSelector(state => state.goals)
  const primaryFontColor = useColorModeValue('#333', 'white')
  // console.log(goals)
  
  useEffect(() => {
    goals.forEach((goal, index) => {
      return checkFailedHabit(goal, index)
    })
  }, [])
  
  const failedArray = goals.filter(goal => goal.status == 'failed')
  const completedArray = goals.filter(goal => goal.status == 'completed')
  
  const progressArray = goals.filter((goal) => goal.status == 'progress')

  function checkFailedHabit(goal, index) {
    const lastUpdated = goal.timestamp
    const currentDate = Date.now()
    // console.log(goal)
    const daysPast = (currentDate - lastUpdated) / ( 60 * 60 * 24 * 1000 )
    // console.log(daysPast)
    
    
    if(daysPast > 2 && goal.status == 'progress') {
      dispatch(updateStatus(goal.goal, 'failed'))
      // console.log(goal)
        // Object.assign([...goals], {[index]: {...goal, status: 'failed'}})
      return null
    } else {
      return goal
    }
  }
  console.log(goals)
  return (
    <Flex width="100%" flexWrap="wrap" color={primaryFontColor}>
      <HabitBox
        name="In Progress"
        length={progressArray.length}
        status="progress"
      >
        {progressArray.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} status="progress" />
        })}
      </HabitBox>
      <HabitBox
        name="Completed"
        length={completedArray.length}
        
      >
        {completedArray.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} />
        })}
      </HabitBox>
      <HabitBox
        name="Failed"
        length={failedArray.length}
      >
        {failedArray.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} />
        })}
      </HabitBox>
    </Flex>
  )
}

export default Habits 