import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../contents/axios/AxiosInterceptor'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";


function UserSports() {
    const {sportId} = useParams()
    const [products, setProducts] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get(`products/getsportproducts/${sportId}`)
        .then(response=>{
            console.log(response.data.result)
            setProducts(response.data.results)
        })
        .catch(error=>{
            console.log(error)
        })

    },[sportId])

  return (
    <div>
        <div  class="flex flex-wrap w-full gap-5 my-9 mx-6">
        {products?.length?
        products.map((product,i)=>{
            return(
                <div onClick={()=>navigate(`/user/product/${product.id}`)} key={i} className='basis-1/6 h-56 hover:cursor-pointer'>
                    <div class="max-w-sm border rounded overflow-hidden shadow-lg">
                    <img class="w-full" src={product.image1} alt="Product Image"/>
                    <div class="px-6 py-4">
                        <p class="text-gray-700 text-base mb-2">Category</p>
                        <div class="font-bold text-md mb-2">{product.title}</div>
                        <p class="text-sky-500 hover:text-green-600 text-base mb-2">Rs.{product.price}</p>
                    </div>
                    </div>
                </div>
        )
        })  
        :
        <div className='mt-9 w-full flex justify-center text-xl'>Sorry No Products Available</div>
        }
        </div>
      
    </div>
  )
}

export default UserSports
