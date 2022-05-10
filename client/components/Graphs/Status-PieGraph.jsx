import { ResponsivePie } from '@nivo/pie'
import { Box } from '@chakra-ui/react'
import React, {useEffect} from 'react';
import {createFetchPayload} from '../../actions/index'

import Badges from '../Badges'
import { useDispatch, useSelector } from "react-redux";

export default function MyResponsivePieCanvas () { 
 
  
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
    "value": progressHabits.length,
    "color": '#F3A712'
  },
  {
    "id": "To Continue",
    "label": "To Continue",
    "value":  failedHabits.length,
    "color": "#BC4749"
  },
  {
    "id": "Achieved",
    "label": "Achieved",
    "value": completedHabits.length,
    "color": '#A7C957'
  }
]


  // { failed, completed, progress }
  // completed.color = "hsl(6, 70%, 65%)"
  
  return (
    <>
    
    <Box width="500px" height="500px">
    
    <ResponsivePie
        data={data} 
        margin={{ top: 40, right: 200, bottom: 40, left: 100 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={data?.map((habit) => habit.color)}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                  'darker',
                  0.6
                ]
            ]
        }}
        defs={[
          {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 3,
              padding: 1,
              stagger: true
          },
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 3,
              spacing: 10
          }
      ]}
      fill={[
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
              id: 'lines'
          },
         
      ]}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#333333"
        legends={[
            {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 140,
                translateY: 100,
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
    </>
  )
}