import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../axios/AxiosInterceptor'
import { toast } from 'react-toastify'
import { baseUrl } from '../Constants'

function Home() {
    const [sports, setSports] = useState()
    
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
            <a href="#" class="inline-block bg-blue-500 text-white px-6 py-3 mt-4 rounded-md hover:bg-blue-600">Shop Now</a>
        </div>
        <div class="md:w-1/2">
            <img src="https://i.pinimg.com/564x/d9/e9/0c/d9e90c6abe153304b7c010290c82c9fa.jpg" alt="Sports Equipment" class="rounded-md shadow-lg"/>
        </div>
    </div>
</div>

<div class="mb-8 mx-6 ">
        <h2 class="text-2xl font-bold mb-2">Featured Sports</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sports?.length && 
            sports.map((sport,index)=>{
                return(
                <div class="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={baseUrl+sport.image} alt="Football" class="w-full h-64 object-cover"/>
                    <div class="p-4">
                       <h3 class="text-lg font-bold text-gray-900 mb-2">{sport.title}</h3>
                    </div>
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
