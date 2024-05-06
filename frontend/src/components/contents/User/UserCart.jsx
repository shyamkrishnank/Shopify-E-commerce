import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import { baseUrl } from '../Constants';
import { toast } from 'react-toastify';


function UserCart() {
    const [cart, setCart] = useState()
    const [cartTotal, setCartTotal] = useState()

    useEffect(()=>{
        axiosInstance.get('order/getcart')
        .then(response=>{
            setCart(response.data.cart)
            setCartTotal(response.data.cartTotal)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    const handleQuantity = (action, index) =>{
        if (action == 'add'){
            const data = {
                'action':action,
                'cartitem':cart[index].id
            }
            axiosInstance.post('order/addquantity/', data)
            .then(response=>{
                setCart(prev=>{ const newCart = [...prev] 
                                newCart[index].quantity++;
                                return newCart}) 
                setCartTotal(response.data.total)

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
        else{
            if (cart[index].quantity > 1){
                const data = {
                    'action':action,
                     'cartitem':cart[index].id
                }
                axiosInstance.post('order/addquantity/', data)
                .then(response=>{
                    setCart(prev=>{ const newCart = [...prev] 
                                    newCart[index].quantity--
                                    return newCart})
                    setCartTotal(response.data.total)

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
            else{
            }
        }
    }

    const handleRemove = (id,index) =>{
        axiosInstance.get(`order/remove/${id}`)
        .then(response=>{
            setCart(prev=>{ const newCart = prev.filter((item, idx) => idx !== index) 
                             return newCart}) 
            setCartTotal(response.data.cartTotal)
            toast.info(`${response.data.message}`, {
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

        })

    }

  return (
    <div>  
    {cart?.length ?  
    <div class="container mx-auto mt-8">
     <div class="flex">
        <div class="w-3/4 mr-4">
            <h2 class="text-lg font-semibold mb-4">Your Cart</h2>
            <div class="bg-white shadow-md rounded-md">
            <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn width={300}>Product</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn align={'center'}>Quantity</TableColumn>
        <TableColumn>Total</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody>
        {cart.map((cartitem,index)=>{
            return(
                <TableRow key={index}>
                <TableCell>
                  <div className='flex items-center'>
                   <img src={baseUrl + cartitem.product.image1} alt="Product Image" class="w-16 h-16 rounded-md mr-4"/>
                   <p>{cartitem.product.title}</p>
                  </div>
                </TableCell>
                <TableCell>Rs.{cartitem.product.price}</TableCell>
                <TableCell>
                          <div class="w-24 bg-white rounded-md shadow-md flex justify-between items-center p-2">
                              <button onClick={()=>handleQuantity("minus",index)} class="text-gray-500 focus:outline-none">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M5 10a1 1 0 0 1 0-2h10a1 1 0 1 1 0 2H5z"/>
                              </svg>
                              </button>
                              <span class="text-gray-800">{cartitem.quantity}</span>
                              <button onClick={()=>handleQuantity("add",index)} class="text-gray-500 focus:outline-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path fill-rule="evenodd" d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1z"/>
                                  </svg>
                              </button>
                           </div>
                </TableCell>
                <TableCell>Rs.{cartitem.product.price * cartitem.quantity}</TableCell>
                <TableCell onClick={()=>handleRemove(cartitem.id,index)} className='text-red-500 hover:cursor-pointer'>Remove</TableCell>
              </TableRow>

            )
        })}

      </TableBody>
    </Table>
    </div>
        </div>
        <div class="w-1/4 mt-14">
            <h2 class="text-lg font-semibold mb-4">Total</h2>
            <div class="bg-white shadow-md rounded-md p-4">
                <div class="flex justify-between items-center border-b border-gray-200 py-2">
                    <span class="text-gray-600">Subtotal:</span>
                    <span class="text-gray-800">Rs.{cartTotal}</span>
                </div>
                <div class="flex justify-between items-center border-b border-gray-200 py-2">
                    <span class="text-gray-600">Shipping:</span>
                    <span class="text-gray-800">Rs.0.00</span>
                </div>
                <div class="flex justify-between items-center py-2">
                    <span class="text-lg font-semibold">Total:</span>
                    <span class="text-lg font-semibold">${cartTotal}</span>
                </div>
                <div className='mt-6  flex justify-center w-full'>
                <Button variant='bordered' color="success">Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    </div>
</div>
:
<div className='flex w-full h-96 items-center justify-center mt-9'>
   <h1 className='text-xl font-semibold'>Cart Empty !</h1>
</div>
}    
 </div>
  )
}

export default UserCart
