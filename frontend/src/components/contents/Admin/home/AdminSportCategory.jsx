import React, { useEffect, useRef, useState } from 'react'
import { axiosInstance } from '../../axios/AxiosInterceptor'
import { toast } from 'react-toastify'
import {Card, CardHeader, CardBody,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Input, Button, useDisclosure, DatePicker, Textarea, Image} from "@nextui-org/react";
import { baseUrl } from '../../Constants';



function AdminSportCategory() {
    const {isOpen,onClose, onOpen, onOpenChange} = useDisclosure();
    const [sports,setSports] = useState()
    const [title, setTitle] = useState()
    const [image, setImage] = useState()
    const imageRef = useRef()


      
  const addImage = () =>{
    imageRef.current.click()
    }
   
  const handleCloseModal = () =>{
       setImage()
       onClose()
     }

  const handleSubmit = () =>{
    if (!image || !title){
        toast.error('Please fill all fields!', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            })

    }
    else{
    const formData = new FormData
    formData.append("title", title)
    formData.append('image', image)
    axiosInstance.post('products/addsports/',formData)
    .then(response=>{
        setSports(prev=>[...prev,response.data.sport])
        onClose()
        toast.success(`${response.data.message}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            })
    })
    .catch(error=>{
        toast.error(`${error.response.data.message}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
            })
    })
   }
    
  }


    useEffect(()=>{
        axiosInstance('products/sports/')
        .then(response=>{
            console.log(response.data)
            setSports(response.data.sports)
        })
        .catch(error=>(
            toast.error('Something went wrong!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                })
        ))
    },[])

  return (
    <div>
      <div className='flex w-full justify-end'>
        <Button onPress={onOpen} color="primary" variant="bordered" className='mr-5'>Add Sports</Button>
      </div>
      {sports?.length?
      <div className='flex flex-wrap w-full gap-3'>
      {sports.map((sport,index)=>{
        return(
        <div className='basis-1/4' key={index}>
             <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{sport.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={`${baseUrl}${sport.image}`}
                    width={270}
                    />
                </CardBody>
            </Card>
        </div>
        )
      })}
      </div>
      :
      <div className='w-3/4 flex justify-center'><h1 className='text-2xl'>No Sports added yet</h1></div>
      }
     <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Book</ModalHeader>
              <ModalBody>
            <div >
              <Input type="text" size='lg' value={title} onChange={e=>setTitle(e.target.value)} label="Title" placeholder="Enter the title" />
           </div>
           <div>
           <Image
                width={300}
                height={100}
                src={image?URL.createObjectURL(image):`/uploadimage.png`}
                className='mt-3 cursor-pointer'
                onClick={addImage}
              />
              <input ref={imageRef} value={""} onChange={e=>setImage(e.target.files[0])} type='file'  accept="image/*" hidden />
           </div>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleCloseModal}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      
    </div>
  )
}

export default AdminSportCategory
