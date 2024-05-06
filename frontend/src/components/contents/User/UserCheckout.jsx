import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../axios/AxiosInterceptor'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button} from "@nextui-org/react";
import { toast } from 'react-toastify';


function UserCheckout() {
    const [products, setProducts] = useState()
    const [address, setAddress] = useState()
    const [total, setTotal] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get('order/checkout/')
        .then(response=>{
            console.log(response.data)
            setProducts(response.data.cart)
            setTotal(response.data.cartTotal)
            setAddress(response.data.address)
        })
        .catch(error=>{ 
            console.log(error)       
        })
    },[])

    const handleClick = () =>{
        if (!address){
            toast.error('Please add address in your profile', {
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
            
        }
    }

    
  return (
    <div>
        {products?.length? 
                <div className="flex flex-wrap p-8">
    
                <div className="w-full lg:w-1/2 space-y-6 pr-4"> 
                    <div className="p-6 border">
                        <h2 className="font-semibold text-lg mb-4">Home Address</h2>
                       {address ? <p>{address}</p>:<p>No Address Provided</p>}
                    </div> 
                </div> 
                <div className="w-full lg:w-1/2 pl-4">
                    <div className="p-6 border">
                        <h2 className="font-semibold text-lg mb-4">Your Order</h2>
                        <div className='mb-6'>
                                <Table aria-label="Example table with dynamic content">
                                <TableHeader>
                                  <TableColumn>Product</TableColumn>
                                  <TableColumn>Quantity</TableColumn>
                                  <TableColumn>Total</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {products?.length && products.map((product,index)=>{
                                        return(
                                            <TableRow key={index}>
                                            <TableCell>{product.product.title}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>{product.product.price * product.quantity}</TableCell>
                                           </TableRow>
                                        )
                                    })}

                                 </TableBody>
                                </Table>
                          </div>
                        <div className="mb-4">
                            <div className='flex'>
                                <div className='basis-1/2 text-xl'>Shipping</div>
                                <div className='basis-1/2 text-xl'>Rs 0.00</div>
                            </div>
                        </div>
                        <div className="mb-10 mt-5 text-orange-500">
                            <div className='flex'>
                                <div className='basis-1/2 text-xl'>Total</div>
                                <div className='basis-1/2 text-xl'>Rs {total}.00</div>
                            </div>
                        </div>
                        <Button onClick={handleClick} className="w-full bg-orange-500 text-white p-2 rounded">Place Order</Button>
                    </div>
                </div>
                </div>
                :
          <div className='w-full flex justify-center mt-20'><h1 className='text-xl'>Nothing there in Cart to Checkout</h1></div>
        }
    </div>
  )
}

export default UserCheckout
