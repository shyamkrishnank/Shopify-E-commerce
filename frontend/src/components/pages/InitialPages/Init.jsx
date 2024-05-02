import React from 'react'
import NavBar from '../../contents/InitialPage/Navbar'
import {Outlet} from 'react-router-dom'

function Init() {
  return (
    <div>
        <NavBar />
        <Outlet />
    </div>
  )
}

export default Init
