import React, { useRef, useState } from 'react'
import {
  useDisclosure,
  Button,
  Modal,
  Text,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Input,
  FormLabel,
  FormControl,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { storeHabit } from '../apis/apiClient'
import { addHabit } from '../actions'

const AddHabit = () => {
  // Chakra settings
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const finalRef = useRef()

  const [newHabit, setNewHabit] = useState('') // can change to action for dispatch
  const dispatch = useDispatch()

  // user token for api call
  const user = useSelector((state) => state.user) // signed in user info

  const handleAddItem = () => {
    const currentDate = Math.floor(new Date().getTime() / 1000)
    const habitToAdd = {
      goal: newHabit,
      timestamp: currentDate,
      daysCompleted: 0,
      status: 'progress',
      goalCompletedAt: 0,
    }

    storeHabit(habitToAdd, user.token)
      .then((addedHabit) => {
        dispatch(addHabit(addedHabit)) // need to check if this is sending back to db
      })
      .catch((err) => {
        console.error('unable to add habit', err)
      })

    onClose()
    return null // this is so the browser stops 'listening' for a response it doesn't need
  }

  const handleChange = (e) => {
    setNewHabit(e.target.value)
  }

  return (
    <>
      {/* showing as a button in HabitBox */}
      <Box
        fontSize={14}
        display="flex"
        alignItems="center"
        ml={'auto'}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text as="span" pr={2}>
          Add Item
        </Text>
        <AddIcon />
      </Box>

      {/* showing as a modal for user input when above button clicked */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new habit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor="habit-task">Habit Task</FormLabel>
              <Input
                id="habit-task"
                onChange={handleChange}
                ref={initialRef}
                placeholder="Enter text here..."
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" onClick={handleAddItem}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddHabit
