import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import { HorizontalCardProduct } from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"}/>
      <VerticalCardProduct category={"mobiles"} heading={"Budget Smartphone"}/>
      <VerticalCardProduct category={"mouse"} heading={"Mouses"}/>
      <VerticalCardProduct category={"Printers"} heading={"Mouses"}/>
      <VerticalCardProduct category={"processor"} heading={"Mouses"}/>
      <VerticalCardProduct category={"refrigerator"} heading={"Mouses"}/>
      <VerticalCardProduct category={"speakers"} heading={"Mouses"}/>
      <VerticalCardProduct category={"trimmers"} heading={"Mouses"}/>
      <VerticalCardProduct category={"televisions"} heading={"Mouses"}/>
    </div>
  )
}

export default Home