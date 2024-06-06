import React, { useState } from 'react'
import { CiEdit } from "react-icons/ci";
import AdminEditProduct from './AdminEditProduct';
import displayInrCurrency from '../helpers/displayCurrency';
export const AdminProductCart = ({
  data,
  fetchdata,
}) => {
  const [editProduct,setEditProduct]=useState(false)
  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-40'>
     <div className='w-32 h-32 flex justify-center items-center'>
     <img src={data?.productImage[0]} width={120} height={120} alt={data?.productImage[0]} className='mx-auto object-scale-down h-full'/>
     </div>
      <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
      <div>
        <div>
          <p className='font-semibold'>
          {
            displayInrCurrency( data?.sellingPrice)
          }
          </p>
        </div>
      <div className='w-fit ml-auto p-2 text-xl bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
        <CiEdit />
      </div>
      </div>
      </div>
      {
        editProduct &&(
          <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
        )
      }
      
    </div>
  )
}
export default AdminProductCart
