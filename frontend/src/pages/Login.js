import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.gif';
import { Link,useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
const Login = () => {
  const [showPassword,setShowPassword]=useState(true);
  const [data,setData]=useState(
    {
      email:"",
      password:""
    }
  )
  const navigate=useNavigate()
  const {fetchUserDetails,fetchUserAddToCart}=useContext(Context)
  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const dataResponse=await fetch(SummaryApi.signin.url,{
      method:SummaryApi.signin.method,
      credentials:'include',
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify(data)
    })
    const dataApi=await dataResponse.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchUserAddToCart()
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }
  console.log("data login",data)
  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons'/>
          </div>
          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Email :</label>
              <div className='bg-slate-100 p-2'>
                <input type='email'
                 placeholder='enter email'
                 name='email'
                 value={data.email}
                 onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'/>
              </div>
            </div>
            <div>
            <label>Password :</label>
            <div className='bg-slate-100 p-2 flex'>
            <input type={showPassword ? "text":"password"}
             placeholder='enter email'
             name='password'
             value={data.password}
             onChange={handleOnChange}
              className='w-full h-full outline-none bg-transparent'/>
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
            <Link to={'/forgot-password'} className='block w-fit font-bold ml-auto hover:underline hover:text-blue-700'>
              Forgot password ?
            </Link>
            </div>
            <button className='bg-blue-500 text-1.5xl hover:bg-blue-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
          </form>
          <p className='my-4 '>Don't have an account ? <Link to={"/sign-up"} className='font-bold text-red-700 hover:text-blue-700 hover:underline'>Sign up</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Login