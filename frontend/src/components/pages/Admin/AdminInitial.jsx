import React from 'react'
import AdminNav from '../../contents/Admin/AdminNav'
import AdminSidebar from '../../contents/Admin/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminInitial() {
  return (
    <div>
        <AdminNav />
        <AdminSidebar />
        <div className='ml-80 mt-5'>
          <Outlet />
        </div>
    </div>
  )
}

export default AdminInitial
