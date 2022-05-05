import React, {useState} from 'react'
import {
  Box,
  Flex,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import IndividualHabit from './IndividualHabit'
import AddHabit from './AddHabit'
// import AchievedHabits from './AchievedHabits'
const Habits = () => {  
  const primaryBgColor = useColorModeValue('gray.100', 'gray.800')
  const primaryFontColor = useColorModeValue('#333', 'white')
  const [goals, setGoals] = useState([{goal: 'Go to sleep'}, {goal: 'Brush teeth'}])


  return (
    <Flex width="100%" flexWrap="wrap" color={primaryFontColor}>
      <Box
        flexGrow={1}
        maxW="420"
        minW="420"
        maxH="600"
        borderColor="gray.500"
        boxShadow="md"
        bg={primaryBgColor}
        p="6"
        m="3"
        position="relative"
        borderTop="4px"
        borderTopColor="green.300"
      >
        <Flex>
          <Text
            pb="1"
            as="span"
            borderColor="green.200"
            fontWeight={500}
            fontSize="18px"
          >
            In Progress | {goals.length} goals
          </Text>
          <AddHabit setGoals={setGoals} />
        </Flex>
        <Box
        
          overflowY={'scroll'}
          css={{
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
            '&::-webkit-scrollbar': {
              display: 'none'
            },
          }}
          height="calc(100% - var(--chakra-space-6))"
        >
          {goals.map(({ goal }, idx) => {
            return <IndividualHabit key={idx} goal={goal} />
          })}
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