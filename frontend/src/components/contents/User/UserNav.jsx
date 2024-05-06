import React, { useEffect, useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar, Button} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../../Slices/AuthSlice';
import { axiosInstance } from '../axios/AxiosInterceptor';

function UserNav() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [sports, setSports] = useState()

  useEffect(()=>{
    axiosInstance.get('products/sports/')
    .then(response=>{
      setSports(response.data.sports)
    })
    .catch(error=>{
      console.log(error)
    })

  },[])

  const handleLogout = () =>{
    localStorage.removeItem('auth_token')
    localStorage.removeItem('is_admin')
    axiosInstance.defaults.headers['Authorization'] = null
    axiosInstance.defaults.headers['Refresh-token'] = null
    dispatch(logout())
    navigate('/')

  }

  return (
    <div className='drop-shadow-xl'>
    <Navbar>
      <NavbarBrand>
        <Image
        className='hover:cursor-pointer'
        onClick={()=>navigate('/')}
        width={60}
        src='/spotifyLogo.png'
         />
      </NavbarBrand>
      <NavbarContent  className="hidden sm:flex gap-12" justify="center">
       <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
             Shop
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
        <Dropdown>
      <DropdownTrigger className=' hover:cursor-pointer'>
          Sports
      </DropdownTrigger>
       <DropdownMenu aria-label="Static Actions">
        {sports?.length && sports.map((sport,index)=>{
          return(
            <DropdownItem onClick={()=>navigate(`/user/sports/${sport.id}`)} key={index}>{sport.title}</DropdownItem>
          )
        })}
       </DropdownMenu>
      </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src=""
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
         <DropdownItem  key="profile" color="success">
            My Profile
          </DropdownItem>
          <DropdownItem onClick={()=>navigate('/user/cart')}  key="profile" color="success">
            My Cart
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

export default UserNav
