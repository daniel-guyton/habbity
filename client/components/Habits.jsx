import React from 'react'
import {
  Heading,
  Box,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react'
import {AddIcon } from '@chakra-ui/icons'
import IndividualHabit from './IndividualHabit'
import AchievedHabits from './AchievedHabits'
const Habits = () => {

  const goals = [{
    goal: 'Go to sleep'
  }, {
    goal: 'Brush teeth'
  }]

  return (
    <Box maxW="650">
      <Heading>Habits</Heading>
      <Box maxW="650" mt="5" mb="5">
        <Flex height={50}>
          <Input placeholder="Add new task"></Input>
          <Button ml="2" colorScheme="green">
            <AddIcon w={3} h={3} />
          </Button>
        </Flex>
      </Box>
      {goals.map(({goal}, idx) => {
        return <IndividualHabit key={idx} goal={goal} />
      })}
      <AchievedHabits />
    </Box>
  )
}

export default Habits 