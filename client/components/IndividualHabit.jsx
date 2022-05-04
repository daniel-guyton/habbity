import React from 'react'
import {Box, Button, Flex, Text, Checkbox } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const IndividualHabit = (props) => {
  return (
  <Flex alignItems="center" mt="2">
        <Box
          height="var(--chakra-sizes-10)"
          borderRadius="5"
          bg="green.300"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text pl="3">{props.goal}</Text>
          <Checkbox pr="3" colorScheme="green" defaultunchecked="true" />
        </Box>
        <Button
          colorScheme="red"
          alignItems="center"
          ml="2"
          height="var(--chakra-sizes-10)"
        >
          <CloseIcon w={3} h={3} />
        </Button>
    </Flex>
  )
}

export default IndividualHabit