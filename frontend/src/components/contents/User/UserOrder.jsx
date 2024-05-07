import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { baseUrl } from '../Constants'
import { Image } from '@nextui-org/react'

function UserOrder() {
    const[orders, setOrders] = useState()

    useEffect(()=>{
        axiosInstance.get('order/getorders/')
        .then(response=>{
            console.log(response.data.orders)
            setOrders(response.data.orders)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

  return (
    <div>
        <div className='w-full h-12 mt-3 ml-5 text-4xl'>
            {/* <h1 >My Orders</h1> */}
        </div>   
       <div class="max-w-4xl mx-auto p-4">  
       {orders?.length ? 
       orders.map((order,index)=>{
        return (
            <div class="bg-white shadow-md rounded-lg p-6 mb-6 hover:cursor-pointer">
            <div class="flex justify-between items-center mb-4">
                <span class="text-zinc-900 font-semibold">Order id - {order.order_num}</span>
                <span class="text-zinc-500">Order Payment Method: - {order.payment_type}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {order?.orderitems && 
            order.orderitems.map((product,index)=>{
                return(
                    <>
                    <div class="flex items-center">
                        <Image width={100} src={baseUrl+product.product.image1} alt="Dress" class="mr-4"/>
                        <div>
                            <p class="font-semibold">{product.product.title}</p>
                            <p class="text-zinc-500">Rs.{product.product.price}</p>
                        </div>
                    </div>
                    <div></div>    
                    </>
                )
            })
            }
            </div>
            </div>
        )
       })

       :
       <div className='text-3xl flex justify-center'>You have not ordered any product yet!</div>
       } 
</div>


      
    </div>
  )
}

export default UserOrder
