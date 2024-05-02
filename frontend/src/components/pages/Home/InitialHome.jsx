import React from 'react'
import UserNav from '../../contents/Home/UserNav'
import { Outlet } from 'react-router-dom'

function InitialHome() {
  return (
    <div>
        <UserNav />
        <Outlet/>
    </div>
  )
}

export default InitialHome
