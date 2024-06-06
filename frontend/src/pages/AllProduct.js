import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import { AdminProductCart } from '../components/AdminProductCart'

const AllProduct = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false)
  const[allProduct,setAllProduct]=useState([])
  const fetchAllProduct=async()=>{
    const response=await fetch(SummaryApi.allProduct.url)
    const dataResponse=await response.json()
    setAllProduct(dataResponse?.data || [])
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])
  return (
    <div className='ml-2 mr-2 mt-2'>
      <div className='bg-white flex justify-between items-center'>
        <h2 className='text-lg font-bold py-2 px-4 mt-2'>
          All Product
        </h2>
        <button className='mr-2 border-2 border-red-600 text-blue-700 hover:text-white hover:bg-blue-500 py-1 px-3 transition-all rounded-full bg-slate-200' onClick={()=>setOpenUploadProduct(true)}>Upload An Product</button>
      </div>
      {/**All Product */}
      <div className='bg-slate-200'>
      <div className='ml-5 flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-180px)] overflow-y-scroll '>
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCart data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
            )
          })
        }
      </div>
      </div>



      {/**Upload Product Component*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default AllProduct