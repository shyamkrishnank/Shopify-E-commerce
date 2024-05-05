import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../../axios/AxiosInterceptor'
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure, useNavbar } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { baseUrl } from '../../../Constants'

function ProductHome() {
  const {catgoryId} = useParams()
  const [category, setCategory] = useState()
  const [products, setProducts] = useState()
  const [title,setTitle] = useState()
  const [description, setDescription] = useState()
  const [price, setPrice] = useState()
  const [stock, setStock] = useState()
  const [image1, setImage1] = useState()
  const [image2, setImage2] = useState()
  const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure();
  const imageRef1 = useRef()
  const imageRef2 = useRef()


  useEffect(()=>{
    axiosInstance.get(`products/getproducts/${catgoryId}`)
    .then(response=>{
      console.log(response.data)
      setCategory(response.data.category)
      setProducts(response.data.products)
    })
    .catch(error=>{
      console.log(error)
    })
  },[])

  const handleCloseModal = ()=>{
    setTitle()
    setDescription()
    setImage1()
    setImage2()
    setPrice()
    setStock()
    onClose()
}

const addImage = (ref) =>{
   ref.current.click()

}

const handleSubmit = ()=>{
  const formData = new FormData
  formData.append('title',title)
  formData.append('description',description)
  formData.append('price',price)
  formData.append('stock',stock)
  formData.append('image1',image1)
  formData.append('image2',image2)
  axiosInstance.post(`products/addproducts/${catgoryId}`,formData)
  .then(response=>{
    setProducts(prev=>[...prev,response.data.product]) 
    setTitle()
    setDescription()
    setImage1()
    setImage2()
    setPrice()
    setStock()
    onClose()
  })
  .catch(error=>{
    console.log(error)
  })
}


  return (
    <div>
        <div className='grid justify-items-stretch '>
             <div className='mr-10 justify-self-end'><Button onPress={()=>onOpen()}>Add Product</Button></div>
             <div className='w-3/12'><h1 className='text-3xl font-semibold' >{category}</h1></div> 
        </div>
      {products?.length?
      <div className='flex flex-wrap w-full mt-3 gap-3'>
      {products.map((product,index)=>{
        return(
        <div className='basis-1/4' key={index}>
             <Card fullWidth={true} className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">{product.title}</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={`${baseUrl}${product.image1}`}
                    width={270}
                    />
                </CardBody>
            </Card>
        </div>
        )
      })}
      </div>
      :
      <div className='w-3/4 flex justify-center'><h1 className='text-2xl'>No products added yet</h1></div>
      }



        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
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
           <div >
              <Input type="number" size='lg' value={price} onChange={e=>setPrice(e.target.value)} label="Price" placeholder="Enter the Price" />
           </div>
           <div >
              <Input type="number" size='lg' value={stock} onChange={e=>setStock(e.target.value)} label="Stock" placeholder="Enter stock available" />
           </div>
           <div className='flex gap-2'>
           <Image
                width={150}
                height={100}
                src={image1?URL.createObjectURL(image1):`/uploadimage.png`}
                className='mt-3 cursor-pointer'
                onClick={()=>addImage(imageRef1)}
             />
            <Image
                width={150}
                height={100}
                src={image2?URL.createObjectURL(image2):`/uploadimage.png`}
                className='mt-3 cursor-pointer'
                onClick={()=>addImage(imageRef2)}
             />
          <input ref={imageRef1} value={""} onChange={e=>setImage1(e.target.files[0])} type='file'  accept="image/*" hidden />
          <input ref={imageRef2} value={""} onChange={e=>setImage2(e.target.files[0])} type='file'  accept="image/*" hidden />
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

export default ProductHome
