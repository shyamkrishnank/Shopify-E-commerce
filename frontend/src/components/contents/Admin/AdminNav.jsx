import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,User} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../Slices/AuthSlice';

function AdminNav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () =>{
    localStorage.removeItem('auth_token')
    localStorage.removeItem('is_admin')
    dispatch(logout())
    navigate('/')

  }

  return (
    <div className='my-2 drop-shadow-xl'>
    <Navbar>
      <NavbarBrand>
        <Image
        className='hover:cursor-pointer'
        onClick={()=>navigate('/')}
        width={60}
        src='/spotifyLogo.png'
         />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQDk8Prqa_VO6KuoRG-skFuc8uhdJZ9ZLCsfnzy0PMA&s"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
         <DropdownItem  key="profile" color="success">
            My Profile
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </NavbarItem>
      </NavbarContent>
    </Navbar>   
    </div>
  )
}

export default AdminNav
