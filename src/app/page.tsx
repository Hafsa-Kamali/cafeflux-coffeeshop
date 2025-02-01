import React from 'react'
import Navbar from "../components/Navbar";
import Carasouel from '@/components/Carasouel';
import Banner from '@/components/Banner';
import Progressor from '@/components/Progressor';
import Coffee from '@/components/Coffee';
import ProductList from '@/components/ProductList';
import Offer from '@/components/Offer';
import FloatingImageContentBlock from '@/components/Card';
import ReservationSection from '@/components/Reservation';
import CafefluxFooter from '@/components/Footer';
import Products from '@/components/Product/page';
import MobileNavbar from '@/components/MobileNav';


export default function page() {
  return (
    <div className="bg-[#F7E1BC] min-h-screen">
      <MobileNavbar/>
<Navbar  />
<Carasouel/>
<Progressor/>
<ProductList/>
<Banner/>
<Coffee/>
<Products />
<Offer/>
<FloatingImageContentBlock/>
<ReservationSection/>
<CafefluxFooter/>
    </div>
  )
}
