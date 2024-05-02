import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";


function NavBar() {
    const navigate = useNavigate()
  return (
    <div className='my-2 drop-shadow-xl'>
    <Navbar>
      <NavbarBrand>
        <Image
        className='hover:cursor-pointer'
        onClick={()=>navigate('/')}
        width={80}
        src='/spotifyLogo.png'
         />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link className='hover:cursor-pointer' onClick={()=>navigate('/login')}>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button color='primary' className='hover:cursor-pointer' onClick={()=>navigate('/signup')} variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>   
    </div>
  )
}

export default NavBar
