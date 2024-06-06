import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa"
import { FaStarHalf } from "react-icons/fa"
import displayInrCurrency from '../helpers/displayCurrency'
import VerticalCardProduct from '../components/VerticalCardProduct'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import addToCart from '../helpers/addToCart'
import Context from '../context'
const Productdeatils = () => {
  const [data,setData]=useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:"",
  })
  const navigate=useNavigate()
  const [zoomImage,setZoomImage]=useState(false)
  const {fetchUserAddToCart}=useContext(Context)
  const params=useParams()
  console.log("product id",params)
  const[loading,setLoading]=useState(true)
  const productImageListLoading=new Array(4).fill(null)
  const[activeImage,setActiveImage]=useState("")
  const [zoomImageCoordinate,setZoomImageCoordinate]=useState({
    x:0,
    y:0
  })
  const fetchProductDetails=async()=>{
    setLoading(true)
    const response=await fetch(SummaryApi.productDetails.url,{
      method:SummaryApi.productDetails.method,
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify({
        productId:params?.id
      })
    })
    setLoading(false)
    const dataResponse=await response.json()
    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }
  console.log("data",data)
  useEffect(()=>{
    fetchProductDetails()
  },[params])
  const handleMouseEnterProduct=(imageUrl)=>{
    setActiveImage(imageUrl)
  }
  const handleZoomImage= useCallback((e)=>{
    setZoomImage(true)
    const {left,top,height,width}=e.target.getBoundingClientRect()
    const x=(e.clientX-left)/width
    const y=(e.clientY-top)/height
    setZoomImageCoordinate({
      x,
      y
    })
    
  },[zoomImageCoordinate])
  
  const handleLeaveImageZoom=()=>{
    setZoomImage(false)
  }
  const handleAddToCart=async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
  }
  const handleBuyToCart=async(e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>
        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/**PRODUCT IMAGE*/}
        <div className='h-96 flex flex-col  lg:flex-row-reverse gap-4'>
          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}></img>
            {/**PRODUCT ZOOM*/}
            {
              zoomImage && (
                <div className='hidden lg:block absolute overflow-hidden min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
              <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply'
              style={{background:`url(${activeImage})`,
              backgroundRepeat:'no-repeat',
              backgroundPosition:`${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
              
              }}>

              </div>
            </div>
              )
            }
            

          </div>
          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                         productImageListLoading.map((el,index)=>{
                          return (
                            <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
        
                            </div>
                          )
                        })
                  }
                </div>
                          
              ):(
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                         data?.productImage?.map((imgUrl,index)=>{
                          return (
                            <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgUrl}>
                              <img src={imgUrl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' 
                              onMouseEnter={()=>handleMouseEnterProduct(imgUrl)}></img>
                            </div>
                          )
                        })
                  }
                </div>
              )
            }
          </div>
        </div>
        {/**PRODUCT DETAILS*/}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block px-5 py-2'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
            <p className='capitalize text-slate-400 bg-slate-200 lg:h-8 min-w-[100px] animate-pulse h-6 w-full'></p>
            <div className='text-red-600 bg-slate-200 h-6 lg:h-8 animate-pulse flex items-center gap-1 w-full'>
            </div>
            <div className='flex items-center lg:h-8 gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse w-full'>
              <p className='text-red-600 lg:h-8 bg-slate-200 w-full'></p>
              <p className='text-slate-400 lg:h-8  line-through bg-slate-200 w-full'></p>
            </div>
            <div className='flex items-center gap-3  my-2 w-full'>
              <button className='h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></button>
              <button className='h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></button>
            </div>
            <div>
              <p className='text-slate-600 font-medium my-1 lg:h-8 h-6 bg-slate-200 animate-pulse w-full'></p>
              <p className='h-10 lg:h-12 bg-slate-200 animate-pulse w-full'></p>
            </div>
            </div>
          ):(
            <div className='flex gap-1 flex-col'>
            <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
            <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
            <p className='capitalize text-slate-400'>{data?.category}</p>
            <div className='text-red-600 flex items-center gap-1'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalf />
            </div>
            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayInrCurrency(data?.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayInrCurrency(data?.price)}</p>
            </div>
            <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-green-600 rounded px-3 py-1 min-w-[120px] hover:bg-yellow-500 hover:text-black text-blue-600 font-semibold' onClick={(e)=>handleBuyToCart(e,data._id)}>Buy</button>
              <button className='border-2 border-green-600 rounded px-3 py-1 min-w-[120px]  hover:bg-yellow-500 hover:text-black text-blue-600 font-semibold' onClick={(e)=>handleAddToCart(e,data._id)}>Add to Cart</button>
            </div>
            <div>
              <p className='text-slate-600 font-medium my-1'>Description : </p>
              <p>{data?.description}</p>
            </div>
            </div>
          )
        }
      </div>
      {
        data.category &&(
          <CategoryWiseProductDisplay category={data?.category} heading={"Recomended Product"}/>
        )
      }
    </div>
  )
}

export default Productdeatils