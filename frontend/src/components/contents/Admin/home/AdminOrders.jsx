import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios/AxiosInterceptor'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';


function AdminOrders() {
    const [orders, setOrders] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get('order/allorders/')
        .then(response=>{
            console.log(response.data)
            setOrders(response.data.orders)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])

  return (
    <div>
        {orders?.length ?
        <>
     <div className='flex w-full justify-end'><Button>Generate CSV</Button></div>
    <div className='mx-5 mt-6'>
     <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>No.</TableColumn>
        <TableColumn>Order id</TableColumn>
        <TableColumn>Order Date</TableColumn>
        <TableColumn>User</TableColumn>
        <TableColumn>No. Products</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody>
        {orders?.length && orders.map((order,index)=>{
            return(
                <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.order_num}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{order.user.username}</TableCell>
                <TableCell>{order.orderitems.length}</TableCell>
                <TableCell onClick={()=>navigate(`/admin/orders/${order.id}`)} className='text-sky-700 hover:cursor-pointer hover:text-sky-950'>View Details</TableCell>
              </TableRow>
            )
        })}

      </TableBody>
    </Table>
    </div>
    </>
    :
    <div className='flex justify-center w-full mt-12'>
        <h1 className='text-2xl'>No Orders Yet!</h1>

    </div>
} 
    </div>
  )
}

export default AdminOrders
