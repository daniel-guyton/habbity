import React from 'react'
import {
  ModalOverlay,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  useDisclosure,
  ModalCloseButton,
} from '@chakra-ui/react'


const AchievedHabits = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      b// ackdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [overlay, setOverlay] = React.useState(<OverlayOne />)

  return (
    <>
      <Button mt='4'
        onClick={() => {
          setOverlay(<OverlayTwo />)
          onOpen()
        }}
      >
        Achieved Tasks
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <Text>Custom backdrop filters!</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AchievedHabits