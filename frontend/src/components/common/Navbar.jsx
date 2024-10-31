import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/logo.png"
import  {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
function Navbar() {
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <div className='flex h-14 flex-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11 max-w-maxContent items-center'>
            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy' alt="" />
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
                                                <p className={`${matchRoute(link?.path) ? "text-yellow-25": "text-richblack-25"}`}>{link.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }

                </ul>
            </nav>

            {/* Login/SignUp/Dashboard */}
            <div className='flex gap-x-4 items-center'>
                    
            </div>
        </div>
    </div>
  )
}

export default Navbar
