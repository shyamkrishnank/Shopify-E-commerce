import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../axios/AxiosInterceptor'
import OrderDetails from '../../pages/User/OrderDetails'
import { baseUrl } from '../Constants'

function UserOrderDetails() {
    const {orderId} = useParams()
    const [orderDetails, setOrderDetails] = useState()
    const [pdfData, setPDFData] = useState(null);


    useEffect(()=>{
        axiosInstance.get(`order/orderdetails/${orderId}`)
        .then(response=>{
            console.log(response.data)
            setOrderDetails(response.data.order)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleInvoice = (id) =>{
        axiosInstance(`order/getinvoice/${id}`)
        .then(response=>{
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPDFData(pdfUrl);
            window.open(pdfUrl, '_blank', 'fullscreen=yes');

        })
        .catch(error=>{
            console.log(error)
        })
    }

  return (
    <div>
        {orderDetails && 
        <>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
       <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div class="bg-white shadow rounded-lg p-4">
            <h2 class="font-semibold text-lg mb-2">Delivery Address</h2>
            <p class="mb-1">{orderDetails.user.username},</p>
            <p class="mb-1">{orderDetails.user.address}</p>
        </div>
        
        <div class="bg-white shadow rounded-lg p-4">
            <h2 class="font-semibold text-lg mb-2">More Actions</h2>
            <div class="flex items-center mb-4">
                <span>Download Invoice</span>
            </div>
            <button onClick={()=>handleInvoice(orderDetails.id)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Download
            </button>
        </div>
    </div>
        </div>
        {orderDetails.orderitems?.length && 
        orderDetails.orderitems.map((product,index)=>{
            return(
                <div key={index} class="max-w-4xl mx-auto p-4 bg-white shadow-lg">
                <div class="flex items-center space-x-4 mb-4">
                    <img src={baseUrl +product.product.image1} alt="Product Image" class="w-20 h-20 object-cover"/>
                    <div>
                        <div class="text-lg font-semibold">{product.product.title}</div>
                        <div>Quantity : {product.quantity}</div>
                        <div class="text-lg font-semibold mt-1">₹{product.product.price}</div>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex-1">
                        <div class="w-full bg-zinc-200 rounded-full h-2.5 dark:bg-zinc-700">
                        </div>
                    </div>
                    <div class="ml-4">
                    </div>
                </div>
            </div>

            )
        })
        }


        </>
        }

      
    </div>
  )
}

export default UserOrderDetails
