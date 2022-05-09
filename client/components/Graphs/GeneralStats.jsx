import React, { useEffect } from 'react'


import { useSelector, useDispatch } from 'react-redux'
import { createFetchPayload } from '../../actions/index'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
// import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
// import { useTable, useSortBy } from 'react-table'

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


  return (
    <TableContainer>
      <Table variant="simple" colorScheme={'blackAlpha'}>
        
        <Thead>
          <Tr>
            <Th>Stats</Th>
            <Th>Habits</Th>
            <Th isNumeric>Number of Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Habits Completed</Td>
            <Td>{completedHabits?.map(habit => {return (<p>{habit.goal}</p>)}) }</Td>
            <Td isNumeric>{completedHabits?.length}</Td>
          </Tr>
          <Tr>
            <Td>Highest Prev Streak</Td>
            <Td>{highestPrevStreakObj?.goal}</Td>
            <Td isNumeric>{highestPrevStreakObj?.daysCompleted}</Td>
          </Tr>
          <Tr>
            <Td>Highest Current Streak</Td>
            <Td>{highestCurrStreakObj?.goal}</Td>
            <Td isNumeric>{highestCurrStreakObj?.daysCompleted}</Td>
          </Tr>
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>Days</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  )
}

// export default function DataTable() {
//   const data = React.useMemo(
//     () => [
//       {
//         fromUnit: 'inches',
//         toUnit: 'millimetres (mm)',
//         factor: 25.4,
//       },
//       {
//         fromUnit: 'feet',
//         toUnit: 'centimetres (cm)',
//         factor: 30.48,
//       },
//       {
//         fromUnit: 'yards',
//         toUnit: 'metres (m)',
//         factor: 0.91444,
//       },
//     ],
//     [],
//   )

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'To convert',
//         accessor: 'fromUnit',
//       },
//       {
//         Header: 'Into',
//         accessor: 'toUnit',
//       },
//       {
//         Header: 'Multiply by',
//         accessor: 'factor',
//         isNumeric: true,
//       },
//     ],
//     [],
//   )

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data }, useSortBy)

//   return (
//     <Table {...getTableProps()}>
//       <Thead>
//         {headerGroups.map((headerGroup) => (
//           <Tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map((column) => (
//               <Th
//                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                 isNumeric={column.isNumeric}
//               >
//                 {column.render('Header')}
//                 <chakra.span pl='4'>
//                   {column.isSorted ? (
//                     column.isSortedDesc ? (
//                       <TriangleDownIcon aria-label='sorted descending' />
//                     ) : (
//                       <TriangleUpIcon aria-label='sorted ascending' />
//                     )
//                   ) : null}
//                 </chakra.span>
//               </Th>
//             ))}
//           </Tr>
//         ))}
//       </Thead>
//       <Tbody {...getTableBodyProps()}>
//         {rows.map((row) => {
//           prepareRow(row)
//           return (
//             <Tr {...row.getRowProps()}>
//               {row.cells.map((cell) => (
//                 <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
//                   {cell.render('Cell')}
//                 </Td>
//               ))}
//             </Tr>
//           )
//         })}
//       </Tbody>
//     </Table>
//   )
// }
