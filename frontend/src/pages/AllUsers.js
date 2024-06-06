import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { CiEdit } from "react-icons/ci";
import moment from 'moment'
import ChangeUserRole from '../components/ChangeUserRole';
const AllUsers = () => {
  const [allUser,setAllUsers]=useState([])
  const[openUpdateRole,setOpenUpdateRole]=useState(false)
  const [updateUserDetails,setUpdateUserDetails]=useState({
    email:"",
    name:"",
    role:"",
    _id:"",
  })
  const fetchAllUers=async()=>{
    const fetchData=await fetch(SummaryApi.allUser.url,{
      method:SummaryApi.allUser.method,
      credentials:'include',
    })
    const dataResponse=await fetchData.json()
    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }
    if(dataResponse.error){
      toast.error(dataResponse.message)
    }
  }
  useEffect(()=>{
    fetchAllUers()
  },[])
  return (
    <div className='bg-white pb-4'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created Date</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el,index)=>{
              return(
                <tr>
                  <td>
                    {
                      index+1
                    }
                  </td>
                  <td>
                    {
                      el?.name
                    }
                  </td>
                  <td>
                    {
                      el?.email
                    }
                  </td>
                  <td>
                    {
                      el?.role
                    }
                  </td>
                  <td>
                    {
                      moment(el?.createdAt).format('LLL')
                    }
                  </td>
                  <td>
                    <button className='bg-green-100 p-2 rounded-full text-xl cursor-pointer hover:bg-green-400 hover:text-white'
                     onClick={()=>{
                      setUpdateUserDetails(el)
                     setOpenUpdateRole(true)}}>
                      <CiEdit/>
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole &&(
          <ChangeUserRole 
          onClose={()=>setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUers}
          />
        )
      }
      
    </div>
  )
}

export default AllUsers