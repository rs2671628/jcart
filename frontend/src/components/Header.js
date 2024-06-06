import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {
  const searchInput=useLocation()
  const urlSearch=new URLSearchParams(searchInput?.search)
  const searchQuery=urlSearch.getAll("q")
  const [search,setSearch]=useState(searchQuery)
  const user=useSelector(state=>state?.user?.user)
  const dispatch=useDispatch()
  const [menuDisplay,setMenuDisplay]=useState(false)
  const navigate=useNavigate()
  const context=useContext(Context)



  const handleLogout=async()=>{
    const fetchData=await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:"include",
    })
    const data=await fetchData.json()
    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if(data.error){
      toast.error(data.message)
    }
  }
 const handleSearch=(e)=>{
  const {value}=e.target
  setSearch(value)
  if(value){
    navigate(`/search?q=${value}`)
  }else{
    navigate("/search")
  }
 }
  
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
          <Logo w={90} h={50}/></Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='search product here' className='w-full outline-none' onChange={handleSearch} value={search}/>
          <div className='text-lg min-w-[50px] h-8 cursor-pointer bg-blue-500 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch/>
          </div>
        </div>
        <div className='flex items-center gap-7'>
          <div className='relative flex justify-center'>
            {
              user?._id &&(
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(prev=>!prev)}>
                {
                  user?.Profilepic?(
                    <img src={user?.Profilepic} className='w-10 h-10 rounded-full' alt={user?.name}/>
                  ):(
                    <FaRegUserCircle/>
                  )
                }
              </div>
              )
            }

          {
            menuDisplay &&(
              <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded'>
              <nav>
                {
                  user?.role===ROLE.ADMIN &&(
                    <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(prev=>!prev)}>Admin Panel</Link>
                  )
                }
                
              </nav>
            </div>
            )
          }

          </div>
          {
            user?._id &&(
              <Link to={"/cart"} className='text-3xl cursor-pointer relative'>
            <span>
            <FaShoppingCart/></span>
            <div className='bg-blue-500 cursor-pointer text-white w-6 h-6 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
              <p className='text-sm'>{context?.cartProductCount}</p>
            </div>
            
          </Link>
            )
          }
          <div>
            {
              user?._id?(
                <button onClick={handleLogout} className='px-3 py-1 cursor-pointer rounded-full text-white bg-blue-500 hover:bg-red-500'>Logout</button>
              ):(
                <Link to={"/login"} className='px-3 py-1 rounded-full cursor-pointer text-white bg-blue-500 hover:bg-red-500'>Login</Link>
              )
            }
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header