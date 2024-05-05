import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../../axios/AxiosInterceptor'
import { toast } from 'react-toastify'
import { Card, CardBody } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

function AdminProductCat() {
    const navigate = useNavigate()
    const [sprots, setSports] = useState()

    useEffect(()=>{
        axiosInstance('products/sports/')
        .then(response=>{
            setSports(response.data.sports)
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
    <div className='mt-9 flex flex-col gap-5'>
        {sprots?.length ? 
        sprots.map((sport,index)=>{
            return(
            <div onClick={()=>navigate(`${sport.id}`)} className='flex w-4/12'>
             <Card className='w-full hover:cursor-pointer' key={index}>
                <CardBody>
                  <p className='text-xl'>{sport.title}</p>
                </CardBody>
              </Card>
             </div>
            )
        })
        :
        <>No Sports Added Yet</>
        }
      
    </div>
  )
}

export default AdminProductCat
