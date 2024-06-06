import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user=useSelector(state=>state?.user?.user)
    const navigate=useNavigate()
    useEffect(()=>{
      if(user?.role!==ROLE.ADMIN){
        navigate("/")
      }
    },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col'>
            <div className='text-5xl cursor-pointer relative flex justify-center'>
            {
              user?.Profilepic?(
                <img src={user?.Profilepic} className='w-16 h-16 rounded-full' alt={user?.name}/>
              ):(
                <FaRegUserCircle/>
              )
            }
          </div> 
          <p className='capitialize font-lg font-bold'>{user?.name}</p>
          <p className='text-sm'>{user?.role}</p>
            </div>
            {/**navigation */}
            <div>
                <nav className='grid p-4'>
                <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-200'>All Users</Link>
                <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-200'>All Product</Link>
                </nav>
            </div>
        </aside>
        <main className='w-full '>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel