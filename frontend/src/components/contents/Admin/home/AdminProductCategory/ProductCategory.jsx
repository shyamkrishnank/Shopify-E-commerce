import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../../axios/AxiosInterceptor'
import { Button, Card, CardBody, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure, useNavbar } from '@nextui-org/react'
import { toast } from 'react-toastify'


function ProductCategory() {
    const {sportId} = useParams()
    const navigate = useNavigate()
    const [sport, setSport] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [categories, setCategories] = useState([])
    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();

    const handleCloseModal = ()=>{
        setTitle()
        setDescription()
        onClose()
    }

    const handleClick = (id) =>{
      navigate(`/admin/product/${id}`)
    }

    const handleSubmit = () =>{
        const data = {
            'title':title,
            'description':description
        }
        axiosInstance.post(`products/addcategory/${sportId}`,data)
        .then(response=>{
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
            setCategories(prev=>[...prev,response.data.category])
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
                setTitle()
                setDescription()
                onClose()
        })

    }


    useEffect(()=>{
        axiosInstance.get(`products/category/${sportId}`)
        .then(response=>{
            console.log(response.data)
            setSport(response.data.sport)
            setCategories(response.data.category)
        })
        .catch(error=>{
            console.log(error)
        })     

    },[])

  return (
    <div>
        <div className='grid justify-items-stretch '>
             <div className='mr-10 justify-self-end'><Button onPress={()=>onOpen()}>Add Category</Button></div>
             <div className='w-3/12'><h1 className='text-3xl font-semibold' >{sport}</h1></div> 
        </div>
        {categories?.length ? 
        <div className='flex flex-row flex-wrap gap-2 mt-5'>
            {categories.map((category,index)=>{
                return(
                 <div onClick={()=>handleClick(category.id)} key={index} className='basis-1/3'>
                    <Card   className=' hover:cursor-pointer' >
                    <CardBody>
                      <p className='text-md font-bold'>{category.title}</p>
                      <p>{category.description}</p>
                    </CardBody>
                   </Card>
                  </div>
                )
            })}
        </div>
        :
        <div className='mt-10 text-xl'>No Category added yet!</div>
        }





      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Product Category</ModalHeader>
              <ModalBody>
            <div >
              <Input type="text" size='lg' value={title} onChange={e=>setTitle(e.target.value)} label="Title" placeholder="Enter the title" />
           </div>
           <div>
           <Textarea
                value={description}
                onChange={e=>setDescription(e.target.value)}
                label="Description"
                placeholder="Enter your description"
                className=""
                />
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

export default ProductCategory
