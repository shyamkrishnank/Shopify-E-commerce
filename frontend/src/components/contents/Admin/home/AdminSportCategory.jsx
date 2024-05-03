import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { axiosInstance } from '../../axios/AxiosInterceptor'
import { toast } from 'react-toastify'


function AdminSportCategory() {
    const [sports,setSports] = useState()

    useEffect(()=>{
        axiosInstance('products/sports/')
        .then(response=>{
            setSports(response.data)
        })
        .catch(error=>(
            toast.error('Something went wrong!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                })
        ))
    },[])

  return (
    <div>
      <div className='flex w-full justify-end'>
        <Button color="primary" variant="bordered" className='mr-5'>Add Sports</Button>
      </div>
      
      
    </div>
  )
}

export default AdminSportCategory
