import React from 'react'
import { createFetchPayload } from '../actions'
import { ResponsivePieCanvas } from '@nivo/pie'
import Piegraph from './Graphs/Status-PieGraph'
import { Text } from '@chakra-ui/react'
import Calender from './Graphs/Calender'
import GeneralStats from './Graphs/GeneralStats'

function displayStats() {
  
  return (
    <>
      <Text pb="1" as="span" fontWeight={500} fontSize="30px" fontStyle={ "Georgia, serif"}>
        Here's Your Journey so Far!
      </Text>
      <GeneralStats />

      <Piegraph />
      <Calender />
    </>
  )
}

export default displayStats
