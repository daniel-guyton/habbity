import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {createFetchPayload} from '../actions'
import { ResponsivePieCanvas } from '@nivo/pie'
import Piegraph from './Graphs/Status-PieGraph'

function displayStats() {
let dispatch = useDispatch()
  
  let habits = useSelector((state) => state.goals)
  console.log(habits)
return (
  <Piegraph id={habits.id} value ={habits.daysCompleted} label={habits.goal}/>
) 
}

export default displayStats