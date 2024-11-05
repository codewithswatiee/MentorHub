import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/logo.png"
import  {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from 'react-icons/io'



function Navbar() {
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);


    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks");
            setSubLinks(result.data.data);
        } catch(err){
            console.log("Couldn't fetch due to the error:",err);
        }
    }
    useEffect(() => {
        fetchSublinks();
    }, [])

  return (
    <div className='flex h-14 border-b-[1px] border-b-richblack-700'>
        <div className='flex mx-auto w-11/12 max-w-maxContent items-center justify-between'>
            <Link>
                <img src={logo} width={160} height={62} loading='lazy'></img>
            </Link>

            <nav>
                <ul className='flex gap-x-6  text-richblack-25'>
                    {
                        NavbarLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='relative flex items-center gap-1 group'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDropdownCircle />

                                                <div className='invisible absolute left-[50%] top-[50%] flex flex-col translate-x-[-50%] translate-y-[55%] bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                                        <div className='absolute translate-x-[80%] translate-y-[-40%] left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                                                {
                                                                    subLinks ? (
                                                                        subLinks.map((sublink, index) => (
                                                                            <Link key={index} to={sublink.link}>{sublink.title}</Link>
                                                                        ))
                                                                    ) : (<div></div>)
                                                                }
                                                        </div>
                                                </div>
                                            </div>
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
                    {
                        user && user?.accountType !== 'Instructor' &&(
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart></AiOutlineShoppingCart>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/login'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to='/signup'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    SignUp
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropdown />
                        )
                    }
            </div>
        </div>
    </div>
  )
}

export default Navbar
