import React from 'react'
import {
  Box,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {AddIcon } from '@chakra-ui/icons'
import IndividualHabit from './IndividualHabit'
// import AchievedHabits from './AchievedHabits'
const Habits = () => {  
  const primaryBgColor = useColorModeValue('gray.100', 'gray.800')
  const primaryFontColor = useColorModeValue('#333', 'white')
  const goals = [{
    goal: 'Go to sleep'
  }, {
    goal: 'Brush teeth'
  }]

  return (
    <Flex width="100%" flexWrap="wrap" color={primaryFontColor}>
      <Box
        flexGrow={1}
        maxW="420"
        minW="420"
        height="600"
        borderColor="gray.500"
        boxShadow="md"
        bg={primaryBgColor}
        p="6"
        m="3"
        position="relative"
        borderTop="4px"
        borderTopColor="green.300"
        
      >
        <Text pb="1" as="span" borderColor="green.200" fontWeight={500} fontSize="18px">
          In Progress
        </Text>

        {goals.map(({ goal }, idx) => {
          return <IndividualHabit key={idx} goal={goal} />
        })}
        <Box
          fontSize={14}
          display="flex"
          alignItems="center"
          position="absolute"
          bottom={0}
          right={0}
          p="6"
          cursor="pointer"
        >
          <Text as="span" pr={2}>
            Add Item
          </Text>
          <AddIcon />
        </Box>
      </Box>
      <Box
        flexGrow={1}
        maxW="420"
        minW="420"
        height="600"
        borderColor="gray.500"
        boxShadow="md"
        bg={primaryBgColor}
        p="6"
        m="3"
        borderTop="4px"
        borderTopColor="green.300"
      >
        <Text pb="1" as="span" fontWeight={500} fontSize="18px">
          Completed
        </Text>
      </Box>
      <Box
        flexGrow={1}
        maxW="420"
        minW="420"
        height="600"
        borderColor="gray.500"
        boxShadow="md"
        bg={primaryBgColor}
        p="6"
        m="3"
        borderTop="4px"
        borderTopColor="green.300"
        fontSize="18px"
      >
        <Text pb="1" as="span" fontWeight={500}>
          To Continue
        </Text>
      </Box>
    </Flex>
  )
}

export default Habits 