import React from 'react'
import Navbar from "../components/Navbar";
import Carasouel from '@/components/Carasouel';
import Banner from '@/components/Banner';
import Progressor from '@/components/Progressor';
import Coffee from '@/components/Coffee';
import MenuItems from '@/components/MenuItems';
import ProductList from '@/components/ProductList';
import Offer from '@/components/Offer';
import FloatingImageContentBlock from '@/components/Card';
import ReservationSection from '@/components/Reservation';


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
<Offer/>
<FloatingImageContentBlock/>
<ReservationSection/>
    </div>
  )
}
