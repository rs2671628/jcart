import React, { useState } from 'react'
import ROLE from '../common/role'
import { FaWindowClose } from "react-icons/fa";
import { json } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole,setUserRole]=useState(role)
    const handleOnChangeSelect=(e)=>{
        setUserRole(e.target.value)
        console.log(e.target.value)
    }
    const updateUserRole=async()=>{
        console.log("hi",SummaryApi.updateUser.url)
        const fetchData=await fetch(SummaryApi.updateUser.url,{
            method:SummaryApi.updateUser.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                userId:userId,
                role:userRole
            })
          })
          const data=await fetchData.json()
          if(data.success){
            toast.success(data.message)
            onClose()
            callFunc()
          }
          if(data.error){
            toast.error(data.message)
          }
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
            <button className='block ml-auto text-red-700 text-xl' onClick={onClose}>
                <FaWindowClose/>
            </button>
            <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
            <p>Name : {name}</p>
            <p>Email : {email}</p>
            <div className='flex items-center justify-between my-4'>
                <p>ROLE:</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                {
                    Object.values(ROLE).map(el=>{
                        return(
                            <option value={el} key={el}>{el}</option>
                        )
                    })
                }
            </select>
            </div>
            <button className='w-fit mx-auto block border py-1 px-3 rounded-full  bg-blue-600 hover:bg-red-600 text-white' onClick={updateUserRole}>
                Change Role
            </button>
        </div>
    </div>
  )
}

export default ChangeUserRole