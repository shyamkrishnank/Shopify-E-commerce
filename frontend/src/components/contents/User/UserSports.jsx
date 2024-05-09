import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../contents/axios/AxiosInterceptor'
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";


function UserSports() {
    const {sportId} = useParams()
    const [products, setProducts] = useState()
    const navigate = useNavigate()

    if (sportId){
    useEffect(()=>{
        axiosInstance.get(`products/getsportproducts/${sportId}`)
        .then(response=>{
            console.log(response.data.results)
            setProducts(response.data.results)
        })
        .catch(error=>{
            console.log(error)
        })

    },[sportId])
}
else{
    useEffect(()=>{
        axiosInstance.get(`products/getallproducts/`)
        .then(response=>{
            console.log(response.data.results)
            setProducts(response.data.results)
        })
        .catch(error=>{
            console.log(error)
        })
    
    },[sportId])
}

  return (
    <div>
        <div  className="gap-2 grid grid-cols-2 sm:grid-cols-4 mx-6">
        {products?.length?
        products.map((product,i)=>{
            return(
                <div onClick={()=>navigate(`/user/product/${product.id}`)} key={i} className=' hover:cursor-pointer'>
                    <div className="max-w-sm border rounded overflow-hidden shadow-lg">
                    <img className="w-full" src={product.image1} alt="Product Image"/>
                    <div className="px-6 py-4">
                        <div className="font-bold text-md mb-2">{product.title}</div>
                        <p className="text-sky-500 hover:text-green-600 text-base mb-2">Rs.{product.price}</p>
                        {product.stock == 0 && <p className='text-red-500'>Out of Stock</p>}
                        {product.stock < 3 && product.stock > 0 && <p className='text-red-500'>Limited Stock Available</p> }
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
