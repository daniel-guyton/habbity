import React from 'react'
import Piegraph from './Graphs/Status-PieGraph'
import { Text } from '@chakra-ui/react'
import Calender from './Graphs/Calender'
import GeneralStats from './Graphs/GeneralStats'

function displayStats() {
  return (
    <>
      <Text
        pb="1"
        as="span"
        fontWeight={700}
        color="#3D2645"
        fontSize="30px"
        fontStyle={''}
        padding="20px"
        position="relative"
        top="10px"
      >
        Here&apos;s Your Journey so Far!
      </Text>
      <GeneralStats />

      <Piegraph />
      <Calender />
    </>
  )
}

export default displayStats
