import React, { useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const Login = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const [data,setData]=useState(
    {
      email:"",
      password:"",
      name:"",
      Confirmpassword:"",
      Profilepic:"",
    }
  )
  const navigate=useNavigate()
  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setData((prev)=>{
        return{
          ...prev,
          [name]:value
        }
      })
  }
  const handleUploadPic=async(e)=>{
    const file=e.target.files[0]
    const imagePic=await imageToBase64(file)
    setData((prev)=>{
        return{
          ...prev,
          Profilepic:imagePic
        }
      })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(data.password===data.Confirmpassword){
      const dataResponse=await fetch(SummaryApi.signup.url,{
        method:SummaryApi.signup.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify(data)
      })
      const dataApi=await dataResponse.json()
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
      console.log("data",dataApi)
    }else{
      console.log("check password and try again")
    }
  }
  console.log("data login",data)
  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
            <img src={data.Profilepic || loginIcons} alt='login icons'/>
            </div>
            <form>
                <label>
                <div className='text-xs bg-opacity-80 pb-4 pt-2 cursor-pointer bg-slate-200 py-3 text-center absolute bottom-0 w-full'>
                Upload Photo
            </div>
                <input type='file' className='hidden' onChange={handleUploadPic}/></label>
            
            </form>
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className='grid'>
              <label>Name :</label>
              <div className='bg-slate-100 p-2'>
                <input type='text'
                 placeholder='enter username'
                 name='name'
                 value={data.name}
                 onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' required/>
              </div>
            </div>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input type='email'
                 placeholder='enter email'
                 name='email'
                 value={data.email}
                 onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' required/>
              </div>
            </div>
            <div>
            <label>Password :</label>
            <div className='bg-slate-100 p-2 flex'>
            <input type={showPassword ? "text":"password"}
             placeholder='enter password'
             name='password'
             value={data.password}
             onChange={handleOnChange}
              className='w-full h-full outline-none bg-transparent' required/>
            <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
              <span>
                {
                  showPassword ? (
                    <FaEyeSlash/>
                  )
                  :
                  (
                    <FaEye/>
                  )
                }
              </span>
            </div>
            </div>

            </div>
            <div>
            <label>Confirm Password :</label>
            <div className='bg-slate-100 p-2 flex'>
            <input type={showConfirmPassword ? "text":"password"}
             placeholder='enter password again'
             name='Confirmpassword'
             value={data.Confirmpassword}
             onChange={handleOnChange}
              className='w-full h-full outline-none bg-transparent' required/>
            <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
              <span>
                {
                  showConfirmPassword ? (
                    <FaEyeSlash/>
                  )
                  :
                  (
                    <FaEye/>
                  )
                }
              </span>
            </div>
            </div>
            
            </div>
            <button className='bg-blue-500 text-1.5xl hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>
          </form>
          <p className='my-4 '>Already have an account ? <Link to={"/login"} className='font-bold text-red-700 hover:text-blue-700 hover:underline'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login