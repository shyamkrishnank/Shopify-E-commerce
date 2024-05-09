import { useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


function UnAuthorizedModal() {
    const {isOpen,onClose, onOpen, onOpenChange} = useDisclosure();
    const navigate = useNavigate()

    useEffect(()=>{
        onOpen()
    },[])

    const handleClick = () =>{
        onClose()
        navigate('/login')
    }

  return (
    <div>
     <Modal isOpen={isOpen} onClose={handleClick} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className='w-full flex flex-col justify-center gap-5'>
                    <div className='w-full text-red-700 flex justify-center'>Your Session Has Ended</div>
                    <div className='w-full text-green-900 flex justify-center'>Please Login to Continue</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={()=>{handleClick()}}>
                  Go to Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
    </div>
  )
}

export default UnAuthorizedModal
