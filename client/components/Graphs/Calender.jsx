import React, { useEffect } from 'react'
import { ResponsiveCalendar } from '@nivo/calendar'
import { Box, Text } from '@chakra-ui/react'

import { createFetchPayload } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'

export default function getGraph() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(createFetchPayload)
  }, [])
  const habits = useSelector((state) => state.goals)

  //filtering through habits -filtering completed ones into array
  let completedHabits = habits.filter((habit) => habit.status == 'completed')

  // key on filtered habits -recieving timestamp (in UNIX form)
  let UNIXdates = completedHabits?.map((habit) => {return habit.goalCompletedAt})
  

  //converting UNIX date to yyyy-mm-dd (thats the way calendar from nivo accepts it)
  let dates = UNIXdates?.map((UNIXdate) => new Date(UNIXdate * 1000))

  let dateArr = dates.map((date) => {
    let month =
      date?.getMonth() < 9
        ? `0${date?.getMonth() + 1}`
        : `${date?.getMonth() + 1}`

    let day =
      date?.getDate() < 9
        ? `0${date?.getDate() + 1}`
        : `${date?.getDate() + 1}`

    let calendarDate = date?.getFullYear() + '-' + month + '-' + day

    return calendarDate
  })
 

  //sorting into a complex arr according to date (ie all habits completed on 9/5/2022 will be sorted in one group/array)
  const allDatesArr = []
  const DateObj = {}
  dateArr.forEach((date) => {
    const tempObj = {}
    if (!DateObj[date]) {
      DateObj[date] = []
      tempObj[date] = DateObj[date]
      allDatesArr.push(tempObj)
    }
    DateObj[date].push({ day: date })
  })

  //structure of allDatesArr [[{2022-03-05:[]}], [{2022-02-06:[]}]] #pain

  //creating an array with correct data from sorted stuff above to go through the calendar component
  let data = allDatesArr.map((date) => {
    let currentDate = Object.keys(date)[0]

    let dateData = [
      {
        value: currentDate[0].length +1,
        day: currentDate,
      },
    ]
    return dateData[0]
  })
 
  return (
    <>
      <Box width="700px" height="300px">
        <Text
          color="green.700"
          fontWeight={600}
          fontSize="20px"
          paddingLeft="20px"
        >
          Your Completed Habits!
        </Text>
        <ResponsiveCalendar
          data={data}
          from="2022-01-01"
          to="2022-05-09"
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 0, right: 40, bottom: 100, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      </Box>
    </>
  )
}
