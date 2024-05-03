import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminSidebar() {
     
    const navigate = useNavigate()


  return (
    <div>
    <div className="flex flex-col fixed ml-3 mt-9 w-64 bg-gray-200 h-3/4">
        <div className="p-4 bg-sky-300 border-b border-gray-300 ">
            <h2 className="text-md font-semibold">Navigation</h2>
        </div>
        <div onClick={()=>navigate('/admin/sportscategory')} className="p-4 hover:cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Sports Categories</h3>
        </div>
        <div className="p-4 border-t border-gray-300 hover:cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Product Categories</h3>
        </div>
        <div className="p-4 border-t border-gray-300 hover:cursor-pointer">
            <h3 className="text-lg font-semibold mb-2">Products</h3>
        </div>
        <div className='p-4 border-t border-gray-300 ' />
    </div>
      
    </div>
  )
}

export default AdminSidebar
