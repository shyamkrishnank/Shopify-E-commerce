import React, { useState } from 'react'
import {Image, Input, Button} from "@nextui-org/react";
import { axiosInstance } from '../axios/AxiosInterceptor';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

function SignupForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password,setPassword] = useState()
    const [conPassword, setConpassword] = useState()

    const handleSubmit = () =>{
        if(username && email && password && conPassword){
            const data = {
                'username' : username,
                'email' :  email,
                'password' : password
            }
            axiosInstance.post('/auth/signup/',data)
            .then(response=>{
              toast.success('Successfully Signed Up!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
                });
                navigate('/login')
          
            })
            .catch(error=>{
              console.log(error)
            })

        }
        else{
            alert("Please fill all the fields")
        }
    }

  return (
    <div className='mt-7'>
        <div className='flex justify-center  gap-4 w-full'>
        <div className='basis-1/2 flex justify-end'>
                <Image
                width={350}
                src='/SignupLogo.png'
                />

              </div>
                <div className='basis-1/2 justify-center w-6/12'>
                  <div className='w-6/12  mt-12 flex flex-col gap-4 justify-center'>
                    <div className='flex justify-center'><h1 className='text-4xl font-semibold'>Sign Up</h1></div> 
                    <div>
                     <Input type="text" value={username} onChange={e=>setUsername(e.target.value)} label="Username" placeholder="Enter your Username" />
                    </div>
                    <div>
                     <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} label="Email" placeholder="Enter your mail" />
                    </div>
                    <div>
                     <Input type="text" value={password} onChange={e=>setPassword(e.target.value)} label="Password" placeholder="Enter your password" />
                    </div>
                    <div>
                     <Input type="password" value={conPassword} onChange={e=>setConpassword(e.target.value)} label="Confirm Password" placeholder="Confirm your password" />
                    </div>
                    <div className='flex justify-center'>
                    <Button onClick={handleSubmit} color="success" variant="bordered">
                     Submit
                    </Button>       
                    </div>
                  </div>
                </div>
        </div>
      
    </div>
  )
}

export default SignupForm
