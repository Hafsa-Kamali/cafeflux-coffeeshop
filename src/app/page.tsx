import React from 'react'
import Navbar from "../components/Navbar";
import Carasouel from '@/components/Carasouel';
import Banner from '@/components/Banner';
import Progressor from '@/components/Progressor';
import Coffee from '@/components/Coffee';
import MenuItems from '@/components/MenuItems';
import ProductList from '@/components/ProductList';


export default function page() {
  return (
    <div className="bg-[#F7E1BC] min-h-screen">
<Navbar />
<Carasouel/>
<Progressor/>
<ProductList/>
<Banner/>
<Coffee/>
<MenuItems/>
    </div>
  )
}
