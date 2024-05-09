import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { toast } from 'react-toastify'
import {Card, CardFooter, Image, Button} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../Constants';

function Home() {
    const [sports, setSports] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        axiosInstance('products/sports/')
        .then(response=>{
            console.log(response.data)
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
    <div>
<div class="container mx-auto mb-10">
    <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="md:w-1/2 mb-4 md:mb-0">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">Welcome to Sports E-commerce</h1>
            <p class="text-gray-700 text-xl">Find the best sports equipment and apparel for your active lifestyle.</p>
            <button onClick={()=>navigate('/user/sports')}  class="inline-block bg-blue-500 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-600">Shop Now</button>
        </div>
        <div class="md:w-1/2">
            <img src="https://i.pinimg.com/564x/d1/64/3f/d1643fb0d81cba977e33beebb9b30897.jpg" alt="Sports Equipment" class="rounded-md "/>
        </div>
    </div>
</div>

<div class="mb-8 mx-6 ">
        <h2 class="text-2xl font-bold mb-2">Featured Sports</h2>
        <div class="flex flex-wrap justify-center gap-5">
            {sports?.length && 
            sports.map((sport,index)=>{
                return(
                    <div     onClick={()=>navigate(`/user/sports/${sport.id}`)}  >
                    <Card
                    radius="lg"
                    className="border-none hover:cursor-pointer"
                  >
                    <Image
                      alt="Woman listing to music"
                      className="object-cover"
                      src={baseUrl+sport.image}
                      width={200}
                      height={1000}
                    />
                    <CardFooter>
                      <p className="text-2xl font-semibold text-red-400">{sport.title}</p>
                    </CardFooter>
                  </Card> 
                  </div>

                )
            })
            }
 
    </div>
</div>
</div>
  )
}

export default Home
