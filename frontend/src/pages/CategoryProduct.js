import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import VerticalCart from '../components/VerticalCart'
import SummaryApi from '../common'

export const CategoryProduct = () => {
    const params=useParams()
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const location=useLocation()
    const navigate=useNavigate()
    const urlSearch=new URLSearchParams(location.search)
    const urlCategoryListInArray=urlSearch.getAll("category")
    const urlCategoryListObject={}
    urlCategoryListInArray.forEach(el=>{
      urlCategoryListObject[el]=true
    })
    const [selectCategory,setSelectCategory]=useState(urlCategoryListObject)
    const[filterCategoryList,setFilterCategoryList]=useState([])
    const [sortBy,setSortBy]=useState("")
    const fetchData=async()=>{
      const response=await fetch(SummaryApi.filterProduct.url,{
        method:SummaryApi.filterProduct.method,
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify({
          category:filterCategoryList
        })
      })
      const dataResponse=await response.json()
      setData(dataResponse?.data || [])
      console.log(dataResponse)
    }
    const handleSelectCategory=async(e)=>{
      const {name,value,checked}=e.target
      setSelectCategory((prev)=>{
        return{
          ...prev,
          [value]:checked
        }
      })
    }
    useEffect(()=>{
      fetchData()
    },[filterCategoryList])


    useEffect(()=>{
      const arrayOfCategory=Object.keys(selectCategory).map(categoryKeyName=>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el=>el)
      setFilterCategoryList(arrayOfCategory)
      //  format for url change when change on the checkbox
      const urlFormat=arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length-1)===index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])

    const handleOnChangeSortBy=(e)=>{
      const {value}=e.target
      setSortBy(value)
      if(value==='asc'){
        setData(prev=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
      }
      if(value==='dsc'){
        setData(prev=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])

  return (
    <div className='container mx-auto p-4'>
        {/**DESKTOP VERION */}
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/**LEFT SIDE */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
              {/**SORY BY */}
              <div className=''>
                  <p className='text-base font-medium text-slate-600 border-b pb-1 border-slate-300'>
                      SORT BY :
                  </p>
                  <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' value={"asc"} checked={sortBy==='asc'} onChange={handleOnChangeSortBy}></input>
                      <label>Price - Low to High</label>
                    </div>
                    <div className='flex items-center gap-3'>
                      <input type='radio' name='sortBy' value={"dsc"} checked={sortBy==='dsc'} onChange={handleOnChangeSortBy}></input>
                      <label>Price - High to Low</label>
                    </div>
                  </form>
              </div>
              {/**FILTER BY */}
              <div className=''>
                  <p className='text-base font-medium text-slate-600 border-b pb-1 border-slate-300'>
                      CATEGORY :
                  </p>
                  <form className='text-sm flex flex-col gap-2 py-2'>
                    {
                      productCategory.map((categoryName,index)=>{
                        return (
                          <div className='flex items-center gap-3'>
                            <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}></input>
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                        )
                      })
                    }
                  </form>
              </div>
          </div>
          {/**RIGHT SIDE (PRODUCT)*/}
          <div className='px-4'>
            <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data?.length}</p>
              <div className='min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-scroll'>
              {
                data.length !==0 && (
                  <VerticalCart data={data} loading={loading}/>
                )
              }
              </div>
          </div>
        </div>
    </div>
  )
}
