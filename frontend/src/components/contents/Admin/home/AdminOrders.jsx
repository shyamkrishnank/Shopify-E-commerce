import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios/AxiosInterceptor'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function AdminOrders() {
    const [orders, setOrders] = useState()
    const [mail, setMail] = useState()
    const navigate = useNavigate()
    const {isOpen, onOpen, onClose} = useDisclosure();


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

    const handleCSV = () =>{
      const data = {
        'mail':mail
      }
        axiosInstance.post('order/generatecsv/',data)
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
        })
        .catch(error=>{
            console.log(error)
        })
    }

  return (
    <div>
        {orders?.length ?
        <>
     <div className='flex w-full justify-end pr-8'><Button color="success" onPress={() =>onOpen()} >Generate CSV</Button></div>
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
    <Modal 
        size={"md"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Enter the email</ModalHeader>
              <ModalBody>
              <Input
                type="email"
                label="Email"
                defaultValue="abc@nextui.org"
                description="Enter the mail you want to send the the csv file."
                className="max-w-xs"
                value = {mail}
                onChange={e=>setMail(e.target.value)}

              />             
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={()=>handleCSV()}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
