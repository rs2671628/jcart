import React, { useState } from 'react'
import { FaWindowClose } from "react-icons/fa";
import productCategory from '../helpers/productCategory';
import { FaFileUpload } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import { DisplayImage } from './DisplayImage';
import { MdDeleteForever } from "react-icons/md";
import { toast } from 'react-toastify';
import SummaryApi from '../common';
const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata,
}) => {
    const[data,setData]=useState({
        ...productData,
        productName:productData?.productName,
        brandName:productData?.brandName,
        category:productData?.category,
        productImage:productData?.productImage || [],
        description:productData?.description,
        price:productData?.price,
        sellingPrice:productData?.sellingPrice,
    })
    const [openFullScreenImage,setOpenFullScreenImage]=useState(false)
    const [fullScreenImage,setfullScreenImage]=useState("")
    const handleOnchange=(e)=>{
        const{name,value}=e.target;
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })

    }
    const handleUploadProduct=async(e)=>{
        const file=e.target.files[0]

        const uploadImageCloudinary=await uploadImage(file)

        setData((prev)=>{
            return{
                ...prev,
                productImage:[...prev.productImage,uploadImageCloudinary.url]
            }
        })

    }
    const handleDeleteProductImage=async(index)=>{
        console.log("image-index",index)
        const newProductImage=[...data.productImage]
        newProductImage.splice(index,1)
        setData((prev)=>{
            return{
                ...prev,
                productImage:[...newProductImage]
            }
        })
    }
        //UPLOAD PRODUCT
    const handleSubmitUpload=async(e)=>{
        e.preventDefault()
        const response=await fetch(SummaryApi.updateProduct.url,{
            method:SummaryApi.updateProduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const dataResponse=await response.json()
        if(dataResponse.success){
            toast.success(dataResponse?.message)
            onClose()
            fetchdata()
        }
        if(dataResponse.error){
            toast.error(dataResponse?.message)
        }
        
    }
  return (
    <div className='top-0 bottom-0 left-0 right-0 bg-slate-600 bg-opacity-50 fixed flex justify-center items-center w-full h-full'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
        <h2 className='font-bold text-lg'>
            UploadProduct
        </h2>
        <div className='w-fit ml-auto text-2xl text-blue-500 hover:text-red-500 cursor-pointer transition-all'onClick={onClose}>
            <FaWindowClose onClick={onClose}/>
        </div>
        </div>
        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmitUpload}>
            <label htmlFor='productName'>Product Name : </label>
            <input 
            required
            type='text'
            id='productName' 
            placeholder='enter Product name' 
            value={data.productName}
            name='productName' 
            onChange={handleOnchange}
            className='p-2 bg-slate-200 border rounded'></input>

            <label htmlFor='brandName' className='mt-2'>Brand Name : </label>
            <input 
            required
            type='text'
            id='brandName' 
            placeholder='enter Brand name' 
            value={data.brandName}
            name='brandName' 
            onChange={handleOnchange}
            className='p-2 bg-slate-200 border rounded'></input>

            <label htmlFor='category' className='mt-2'>Category Name : </label>
            <select required value={data.category} name='category'  className='p-2 bg-slate-200 border rounded' onChange={handleOnchange}>
                <option value={""}>Select Category</option>
                {
                    productCategory.map((el,index)=>{
                        return(
                            <option value={el.value} key={el.value+index}>{el.label}</option>
                        )
                    })
                }
            </select>

            <label htmlFor='productImage' className='mt-2'>Product Image : </label>
            <label htmlFor='uploadImageInput'>
            <div className='p-2 bg-slate-200 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>               
                    <div className='text-slate-700 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'>
                        <FaFileUpload/>
                        </span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input type='file' id='uploadImageInput' name='uploadImageInput' className='hidden' onChange={handleUploadProduct}>
                        </input>
                        </div>               
            </div>
            </label>
            <div>
                {
                    data?.productImage[0]?(
                        <div className='flex items-center gap-2'>{
                            data.productImage.map((el,index)=>{
                            return(
                                <div className='relative group'>
                                <img
                                src={el} 
                                alt={el} 
                                width={80} 
                                height={80} 
                                className='bg-slate-200 border cursor-pointer' 
                                onClick={()=>{
                                    setOpenFullScreenImage(true)
                                    setfullScreenImage(el)
                                }}/>
                                <div className='absolute bottom-0 right-0 text-xl text-red-700 bg-white rounded-full hidden group-hover:block transition-all cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                    <MdDeleteForever/>
                                </div>
                                
                                </div>
                            )
                        })
                    }
                        </div>
                    ):(
                        <p className='text-red-500 text-xs mb-3'>Please Upload Product</p>
                    )
                }
                
            </div>
            <label htmlFor='price' className='mt-2'>Price : </label>
            <input 
            required
            type='number'
            id='price' 
            placeholder='enter Price' 
            value={data.price}
            name='price' 
            onChange={handleOnchange}
            className='p-2 bg-slate-200 border rounded'></input>

            <label htmlFor='sellingPrice' className='mt-2'>Selling Price : </label>
            <input 
            required
            type='number'
            id='sellingPrice' 
            placeholder='enter selling price' 
            value={data.sellingPrice}
            name='sellingPrice' 
            onChange={handleOnchange}
            className='p-2 bg-slate-200 border rounded'></input>


            <label htmlFor='description' className='mt-2'>Description : </label>
            <textarea 
            required
            className='h-28 bg-slate-200 border resize-none p-1' 
            placeholder='Enter Product Description' 
            rows={3} 
            onChange={handleOnchange}
            id='description'
            name='description'
            value={data.description}>

            </textarea>



            <button className='px-3 py-2 bg-blue-600 text-white mb-10'>Update Product</button>
        </form>
        </div>
        {/**Display Image Full Screen */}
        {
            openFullScreenImage && (
                <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
            )
        }
        
    </div>
  )
}

export default AdminEditProduct