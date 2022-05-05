import {Box, Flex, Text, useColorModeValue} from '@chakra-ui/react'
import React from 'react'
import AddHabit from './AddHabit'

const HabitBox = (props) => {
  const primaryBgColor = useColorModeValue('gray.100', 'gray.800')
  const {name, length, status, children} = props
  return (
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
          {name} | {length}
        </Text>
        {status ? <AddHabit /> : null}
      </Flex>
      <Box
        overflowY={'scroll'}
        css={{
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        height="calc(100% - var(--chakra-space-6))"
      >
        {children}
      </Box>
    </Box>
  )
}

export default HabitBox