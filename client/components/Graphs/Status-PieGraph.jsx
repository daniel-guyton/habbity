import { ResponsivePie } from '@nivo/pie'
import { Box } from '@chakra-ui/react'
import React, {useEffect} from 'react';
import {createFetchPayload} from '../../actions/index'

import Badges from '../Badges'
import { useDispatch, useSelector } from "react-redux";

export default function MyResponsivePieCanvas () { 
  console.log('pie graph is being called')
  
  const dispatch = useDispatch()

  useEffect(()=> 
  {dispatch(createFetchPayload)}, [])
  const habits = useSelector((state) => state.goals)
 
 let progressHabits = habits.filter(habit => habit.status == 'progress')
 let completedHabits = habits.filter(habit => habit.status == 'completed')
 let failedHabits = habits.filter(habit => habit.status == 'failed')


const data = [
  {
    "id": "In Progress",
    "label": "In Progress",
    "value": progressHabits.length 
    // "color": "hsl(139, 70%, 50%)"
  },
  {
    "id": "To Continue",
    "label": "To Continue",
    "value":  failedHabits.length
    // "color": "hsl(350, 70%, 50%)"
  },
  {
    "id": "Achieved",
    "label": "Achieved",
    "value": completedHabits.length
    // "color": "hsl(6, 70%, 15%)"
  }
]


  // { failed, completed, progress }
  // completed.color = "hsl(6, 70%, 65%)"
  
  return (
    <Box width="500px" height="500px">
    <p> the pie thing renders something</p>
    <ResponsivePie
        data={data} // TODO replace with useSelector data
        margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'paired' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.6
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#333333"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Achieved'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'In Progress'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'To Continue'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 140,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 60,
                itemHeight: 14,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 14,
                symbolShape: 'circle'
            }
        ]}
    />
    </Box>
  )
}