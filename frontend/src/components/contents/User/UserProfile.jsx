import { Input, Textarea } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { toast } from 'react-toastify'

function UserProfile() {
    const [user,setUser] = useState()

    useEffect(()=>{
        axiosInstance.get('auth/getuser')
        .then(response=>{
            console.log(response.data)
            setUser(response.data.user)
        })
        .catch(error=>{
            console.log(error)
        })

    },[])

    const handleClick = ()  =>{
        console.log(user.address)
        if (!user.address){
            toast.error("Please fill the address field", {
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
            const data = {
                "address":user.address
            }
            axiosInstance.post('auth/addaddress/', data)
            .then(response=>{
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
        }

    }


  return (
    <div>
        {user && 
        <div className="container mx-auto py-8">
       <div className="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <div className="p-4 bg-gray-200 flex justify-center">
            <img src="https://i.pinimg.com/564x/e1/80/92/e180923bec01362c14f8a5acfeb7c91b.jpg" alt="Profile Photo" className="w-32 h-32 rounded-full"/>
        </div>
        <div className="px-4 flex flex-col gap-2 py-2">
             <Input isReadOnly type="email" value={user.username}  variant= "underlined" label="Username" placeholder={user.username} />
             <Input isReadOnly type="email" value={user.email} variant= "underlined" label="Email" placeholder={user.email} />   
             <Textarea  variant="underlined" onChange={e=>setUser(prev => ({ ...prev, address: e.target.value }))} value={user.address}  label="Address"  labelPlacement="outside"  placeholder="Enter your address"   classNameName="col-span-12 md:col-span-6 mb-6 md:mb-0"    />
        </div>
        <div className="p-4">
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
        </div>
         </div>
        </div> }
    </div>
  )
}

export default UserProfile
