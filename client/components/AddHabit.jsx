import React, {useRef, useState} from "react"
import { useDisclosure, Button, Modal, Text, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, Input, FormLabel, FormControl} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useDispatch } from "react-redux"
import { addGoal } from "../actions"
const AddHabit = (props) =>  {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const finalRef = useRef()
  const [newHabit, setNewHabit] = useState('')

  const handleAddItem = () => {
    
    const currentDate = Date.now()
    dispatch(
      addGoal({
        goal: newHabit,
        timestamp: currentDate,
        day: 0,
        status: 'progress',
      })
    )

    onClose()
  }

  const handleChange = (e) => {
    setNewHabit(e.target.value)
  }
  return (
    <>
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
              <Input id="habit-task" onChange={handleChange} ref={initialRef} placeholder="Enter text here..." />
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