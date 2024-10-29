import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/logo.png"
import  {NavbarLinks} from "../../data/navbar-links"
function Navbar() {
  return (
    <div className='flex flex-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11 max-w-maxContent items-center'>
            <Link to="/">
                <img src={logo} width={200} height={60} loading='lazy' alt="" />
            </Link>

            <nav>
                <ul className='flex gap-x-6  text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div></div>
                                        ) : (
                                            <Link to={link?.path}>
                                                <p className='hover:text-yellow-5'>{link.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }

                </ul>
            </nav>
        </div>
    </div>
  )
}

export default Navbar
