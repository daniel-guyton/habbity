import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { createFetchPayload, updateHabit } from '../../actions/index'
import { Flex, Spacer, Box, Text, Button } from '@chakra-ui/react'
import { patchHabit } from '../../apis/apiClient'
import { useNavigate,} from "react-router-dom";

export default function getStats() {
 

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createFetchPayload)
  }, [])

  const habits = useSelector((state) => state?.goals)

  let completedHabits = habits?.filter((habit) => habit.status == 'completed')

  let failedHabits = habits?.filter((habit) => habit.status == 'failed')
  const user = useSelector((state) => state.user)
  let highestPrevStreakObj 
  
    if (failedHabits.length > 0) {
      
      highestPrevStreakObj = failedHabits?.reduce(function (max, obj) {
        return obj.daysCompleted > max.daysCompleted ? obj : max
      })
   
    } else {
      highestPrevStreakObj = null
    }
  
  let highestCurrStreakObj
  let currentHabits = habits?.filter((habit) => habit.status == 'progress')
  console.log(currentHabits)
  if (currentHabits.length > 0) {
    highestCurrStreakObj = currentHabits?.reduce(function (max, obj) {
      return obj.daysCompleted > max.daysCompleted ? obj : max
    })
  } else {
    highestCurrStreakObj = null
  }
const navigate = useNavigate()
  function handleButtonClick(evt) {
    const id = evt.target.value
    patchHabit({ id: id, status: 'progress' }, user.token)
      .then(() => {
        dispatch(updateHabit({ id: id, status: 'progress' }))
      })
      .catch((err) => {
        console.error('failed to update status progress', err)
      })
      navigate('/')
  }

 
    failedHabits = habits?.filter((habit) => habit.status == 'failed')

 
  

  
  const currdays = highestCurrStreakObj?.daysCompleted == 1 ? `day` : `days`

  const currday = highestCurrStreakObj == null ? 'NEW HABIT' : currdays

  const prevdays = highestPrevStreakObj?.daysCompleted == 1 ? `day` : `days`

  const prevday = highestPrevStreakObj == null ? '(:' : prevdays


  const firstCurrMess =  highestCurrStreakObj == null ?  'Time to try a ' : `You've been keeping up `
  const secCurrMess =  highestCurrStreakObj == null ?  '' : `for `

  
  const firstPrevMess =  highestPrevStreakObj == null ?  `You're on track for all your goals `  : `You've been keeping up `
  const secPrevMess =  highestPrevStreakObj == null ?  '' : `for `

  const button = highestPrevStreakObj == null ?  `Habits`  : `try again `
 console.log(highestPrevStreakObj)
  return (
    <Flex>
      <Spacer />
      <Box
        w="200px"
        h="120"
        bg="gray.100"
        boxShadow="dark-lg"
        rounded="md"
        pos="relative"
        top="10"
        left="0"
      >
        <Text
          pb="1"
          color="green.900"
          fontWeight={700}
          fontSize="14px"
          padding="2px"
          sx={{ textAlign: 'center' }}
        >
          TOP CURRENT DAY RUN
        </Text>

        <Text
          pb="1"
          color="green.900"
          fontWeight={500}
          fontSize="14px"
          padding="0px"
          sx={{ textAlign: 'center' }}
        >
         {firstCurrMess}
          <span style={{ fontWeight: 700 }}>{highestCurrStreakObj?.goal}</span>{' '}
          {secCurrMess}
        </Text>

        <Text
          pb="1"
          color="green.700"
          fontWeight={500}
          fontSize="30px"
          padding="0px"
          sx={{ textAlign: 'center', position: 'relative', bottom: '10px' }}
        >
          {' '}
          <span style={{ fontWeight: 700, fontSize: 35 }}>
            {highestCurrStreakObj?.daysCompleted}
          </span>{' '}
          {currday}
         
        </Text>
      </Box>
      <Spacer />
      <div>
        <Box
          w="200px"
          h="120"
          bg="gray.100"
          boxShadow="dark-lg"
          rounded="md"
          pos="relative"
          top="10"
          left="0"
        >
          <Text
            pb="1"
            color="green.900"
            fontWeight={700}
            fontSize="14px"
            padding="2px"
            sx={{ textAlign: 'center' }}
          >
            TOP PREV DAY RUN
          </Text>
          <>
                
                <Text
                  pb="1"
                  color="green.900"
                  fontWeight={500}
                  fontSize="14px"
                  padding="0px"
                  sx={{ textAlign: 'center' }}
                >
                 {firstPrevMess}
                  <span style={{ fontWeight: 700 }}>
                    {highestPrevStreakObj?.goal}
                    {' '}
                  </span>
                  {secPrevMess}
                </Text>
                <Text
                  pb="1"
                  color="green.700"
                  fontWeight={500}
                  fontSize="30px"
                  padding="0px"
                  sx={{
                    textAlign: 'center',
                    position: 'relative',
                    bottom: '10px',
                  }}
                >
                  
                  <span style={{ fontWeight: 700, fontSize: 35 }}>
                    {highestPrevStreakObj?.daysCompleted}
                  </span>
                  {' '}
                  {prevday}
                </Text>
              </>
            
        
        </Box>
        <Button
          onClick={handleButtonClick}
          value={highestPrevStreakObj?.id}
          colorScheme="green"
          sx={{ position: 'relative', bottom: '-30px', left: '120px' }}
        >
          {button}
        </Button>
      </div>
      <Spacer />

      <Spacer />
      <Box
        w="200px"
        h="120"
        bg="gray.100"
        boxShadow="dark-lg"
        rounded="md"
        pos="relative"
        top="10"
        left="0"
      >
        <Text
          pb="1"
          color="green.900"
          fontWeight={700}
          fontSize="12px"
          padding="2px"
          sx={{ textAlign: 'center' }}
        >
          HABITS YOU&apos;VE ACCOMPLISHED:{' '}
        </Text>
        <Text
          pb="1"
          color="green.700"
          fontWeight={500}
          fontSize="30px"
          sx={{ textAlign: 'center', position: 'relative', top: '-5px' }}
        >
          <span style={{ fontWeight: 700, fontSize: 35 }}>
            {completedHabits.length}
          </span>{' '}
        </Text>
        <Text
          pb="1"
          color="green.800"
          fontWeight={500}
          fontSize="16px"
          padding="3px"
          sx={{ textAlign: 'center', position: 'relative', bottom: '10px' }}
        >
          Superb (:
        </Text>
      </Box>
      <Spacer />
    </Flex>

  )
}
