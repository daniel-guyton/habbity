import React, {useState, useEffect} from 'react'
import {
  Box,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import IndividualHabit from './IndividualHabit'
import AddHabit from './AddHabit'
import HabitBox from './HabitBox'
// import AchievedHabits from './AchievedHabits'
const Habits = () => {  

  
  const primaryFontColor = useColorModeValue('#333', 'white')
  const [goals, setGoals] = useState([
    { goal: 'Go to sleep', status: 'progress', timestamp: 1651942639000, days: 2 },
    {
      goal: 'Brush teeth',
      status: 'failed',
      timestamp: 1651371062000,
      days: 6,
    },
    {
      goal: 'Walk dogs',
      status: 'progress',
      timestamp: 1651198262000,
      days: 3,
    },
    {
      goal: 'Workout',
      status: 'completed',
      timestamp: 1651198262000,
      days: 28,
    },
  ])
  
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
    console.log(goal)
    const daysPast = (currentDate - lastUpdated) / ( 60 * 60 * 24 * 1000 )
    console.log(daysPast)
    
    
    if(daysPast > 2 && goal.status == 'progress') {
    
      console.log(goal)
      const updatedArray = goals.map((goal, i) => {
        if (i === index) {
            return {
                ...goal,
                status: 'failed'
            }
        } else return goal
    })
      setGoals(updatedArray)
        // Object.assign([...goals], {[index]: {...goal, status: 'failed'}})
      return null
    } else {
      return goal
    }
  }

  return (
    <Flex width="100%" flexWrap="wrap" color={primaryFontColor}>
      <HabitBox
        name="In Progress"
        length={progressArray.length}
        status="progress"
        setGoals={setGoals}
      >
        {progressArray.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} />
        })}
      </HabitBox>
      <HabitBox
        name="Completed"
        length={completedArray.length}
        setGoals={setGoals}
      >
        {completedArray.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} />
        })}
      </HabitBox>
      <HabitBox name="Failed" length={failedArray.length} setGoals={setGoals}>
        {failedArray.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} />
        })}
      </HabitBox>
    </Flex>
  )
}

export default Habits 