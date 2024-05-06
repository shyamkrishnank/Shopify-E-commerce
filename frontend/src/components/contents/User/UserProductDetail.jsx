import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { baseUrl } from '../Constants'
import { Button, Image } from '@nextui-org/react'
import { toast } from 'react-toastify'

function UserProductDetail() {
    const {productId} = useParams()
    const [product, setProduct] = useState()

    useEffect(()=>{
        axiosInstance.get(`products/getproductdetails/${productId}`)
        .then(response=>{
            setProduct(response.data.product)
            console.log(response.data)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])

    const handleCart = (id) =>{
       const data = {
        "product":id
       }
       axiosInstance.post('order/addtocart/',data)
       .then(response=>{
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
            })       })
    }

  return (
    <div>
        {product?
    <div className="container mx-auto mt-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg flex ">
            <div className='w-1/12 flex flex-col gap-4 justify-center'>
                <div className='border'><Image src={`${baseUrl}${product.image1}`} /></div>
                <div className='border'><Image src={`${baseUrl}${product.image2}`}/></div> 
            </div>
        <div className="w-2/4">
            <Image className="w-full" src={`${baseUrl}${product.image1}`} alt="Product Image"/>
        </div>
        <div className="w-2/3 p-6">
            <h1 className="text-4xl font-semibold mb-4">{product.title}</h1>
            <p className="text-gray-700 text-2xl mb-4">Category: {product.category.title}</p>
            <p className="text-gray-700 text-2xl mb-4">Price: Rs.{product.price}</p>
             <Button onClick={()=>handleCart(product.id)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add to Cart</Button>
            <h1 className='mt-8 font-semibold text-xl'>Product Information</h1>
             <div className='mt-4'><p className="text-gray-700  mb-4"> {product.description}</p> </div>
            
        </div>
        </div>
    </div>:
    <div className='mt-5 ml-5 text-xl'><h1>Loading... Please Wait a Sec</h1></div>
    }
    </div>
  )
}

export default UserProductDetail
