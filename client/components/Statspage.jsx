import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createFetchPayload} from '../actions'
import { ResponsivePieCanvas } from '@nivo/pie'
import Piegraph from './Graphs/Status-PieGraph'
import {Text} from "@chakra-ui/react"
import Calender from './Graphs/Calender'
 

function displayStats() {
useEffect(()=> {createFetchPayload()}, [])
return (

  <>
  <Text 
     pb="1"
     as="span"
     fontWeight={500}
     fontSize="30px">
      Welcome to your Statistics!!!
  </Text>
 
  <Piegraph/>
  <Calender/>

  </>
) 
}

export default displayStats