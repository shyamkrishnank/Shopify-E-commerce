import React from 'react'
import {Image} from "@nextui-org/react";


function Banner() {
  return (
    <div className='flex mt-12'>
        <div className='basis-1/2'>
            <div className='flex flex-col w-full h-80 justify-center align-middle'>
                <div className='flex w-full justify-center'><h1 className='text-4xl font-bold shadow-sm'>Where Champions Gear Up.</h1></div>
                <div className='flex w-full justify-center mt-5'><p className='text-xl italic text-cyan-950'> Welcome to our premier e-commerce destination,<br/> where champions gear up for success with just a click.</p></div>
            </div>

        </div>
        <div className='basis-1/2 flex justify-center'>
            <Image
            isBlurred
            width={400}
            alt="NextUI hero Image with delay"
            src="/Banner1.png"
            /> 
        </div>
 
    </div>
  )
}

export default Banner
