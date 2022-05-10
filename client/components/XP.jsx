import React from 'react'
import { Tag } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
const XP = () => {
  const xp = useSelector((state) => state.profile.points)
  return (
    <Tag
      fontSize="11px"
      size="sm"
      key="sm"
      colorScheme="green"
      variant="subtle"
    >
      Points: {xp}
    </Tag>
  )
}

export default XP
