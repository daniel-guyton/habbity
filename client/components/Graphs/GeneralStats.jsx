import React, { useEffect } from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { createFetchPayload } from '../../actions/index'
import { Flex, Spacer, Box, Text} from '@chakra-ui/react'


export default function getStats() {
 


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createFetchPayload)
  }, [])
  const habits = useSelector((state) => state?.goals)
 
  let completedHabits = habits?.filter((habit) => habit.status == 'completed')

  let failedHabits = habits?.filter((habit) => habit.status == 'failed')


  let highestPrevStreakObj
  if (failedHabits.length > 0){
  highestPrevStreakObj = failedHabits?.reduce(function(max, obj) {
    return obj.daysCompleted > max.daysCompleted? obj : max;
  });
  }
  else{
    highestPrevStreakObj = null
  }



  let highestCurrStreakObj
  let currentHabits = habits?.filter((habit) => habit.status == 'progress')
  if (currentHabits.length > 0){
    highestCurrStreakObj = currentHabits?.reduce(function(max, obj) {
     return obj.daysCompleted > max.daysCompleted? obj : max;
    });
  }
  else{
    highestCurrStreakObj = null
  }

const day = highestCurrStreakObj?.daysCompleted < 2
? `day`
: `days`
  return (



  <Flex>
    <Spacer />
      <Box w='200px' h='120' bg="gray.100" boxShadow='dark-lg' rounded='md' pos="relative" top="10" left="0">
      <Text  pb="1" color="green.900" fontWeight={700} fontSize="14px"  padding = '2px' sx= {{ textAlign: 'center'}} >TOP CURRENT DAY RUN</Text>
       
        <Text  pb="1" color="green.900" fontWeight={500} fontSize="14px"  padding = '0px' sx= {{ textAlign: 'center'}} >You&apos;ve been keeping up <span style={{fontWeight:700}}>{highestCurrStreakObj?.goal}</span></Text>
 
        <Text  pb="1"  color="green.700" fontWeight={500} fontSize="30px" padding = '0px' sx ={{  textAlign: 'center', position: 'relative', bottom: '10px'}}> for <span style={ {fontWeight:700, fontSize:35}}>{highestCurrStreakObj?.daysCompleted}</span> {day}</Text>    
      
      </Box>
      <Spacer />

      <Box w='200px' h='120' bg="gray.100" boxShadow='dark-lg' rounded='md' pos="relative" top="10" left="0">
      <Text  pb="1" color="green.900" fontWeight={700} fontSize="14px"  padding = '2px' sx= {{ textAlign: 'center'}} >TOP PREV DAY RUN</Text>
       
        <Text  pb="1" color="green.900" fontWeight={500} fontSize="14px"  padding = '0px' sx= {{ textAlign: 'center'}} >You nearly completed <span style={{fontWeight:700}}>{highestPrevStreakObj?.goal}</span></Text>
 
        <Text  pb="1"  color="green.700" fontWeight={500} fontSize="30px" padding = '0px' sx ={{  textAlign: 'center', position: 'relative', bottom: '10px'}}> for <span style={{fontWeight:700, fontSize:35}}>{highestPrevStreakObj?.daysCompleted}</span> {day}</Text>    
      
      </Box>

    <Spacer />
    

    <Spacer />
    <Box w='200px' h='120' bg="gray.100" boxShadow='dark-lg' rounded='md' pos="relative" top="10" left="0">
      <Text  pb="1" color="green.900" fontWeight={700} fontSize="12px"  padding = '2px' sx= {{textAlign: 'center'}} >HABITS YOU&apos;VE ACCOMPLISHED</Text>
        <Text  pb="1" color="green.700" fontWeight={500} fontSize="30px" sx ={{textAlign: 'center', position: 'relative', top: '-5px'}}><span style={ {fontWeight:700, fontSize:35}}>{completedHabits.length}</span> Habits</Text>
        <Text  pb="1" color="green.800" fontWeight={500} fontSize="16px"  padding = '3px' sx= {{textAlign: 'center', position: 'relative', bottom: '10px'}} >Superb (:</Text>   

      </Box>
    <Spacer />
  </Flex>
  




















    // <TableContainer>
    //   <Table variant="simple" colorScheme={'blackAlpha'}>
        
    //     <Thead>
    //       <Tr>
    //         <Th>Stats</Th>
    //         <Th>Habits</Th>
    //         <Th isNumeric>Number of Days</Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       <Tr>
    //         <Td>Habits Completed</Td>
    //         <Td>{completedHabits?.map(habit => {return (<p>{habit.goal}</p>)}) }</Td>
    //         <Td isNumeric>{completedHabits?.length}</Td>
    //       </Tr>
    //       <Tr>
    //         <Td>Highest Prev Streak</Td>
    //         <Td>{highestPrevStreakObj?.goal}</Td>
    //         <Td isNumeric>{highestPrevStreakObj?.daysCompleted}</Td>
    //       </Tr>
    //       <Tr>
    //         <Td>Highest Current Streak</Td>
    //         <Td>{highestCurrStreakObj?.goal}</Td>
    //         <Td isNumeric>{highestCurrStreakObj?.daysCompleted}</Td>
    //       </Tr>
    //     </Tbody>
    //     {/* <Tfoot>
    //       <Tr>
    //         <Th>To convert</Th>
    //         <Th>into</Th>
    //         <Th isNumeric>Days</Th>
    //       </Tr>
    //     </Tfoot> */}
    //   </Table>
    // </TableContainer>
  )
}

