import React from 'react'
import Navbar from "../components/Navbar";
import Carasouel from '@/components/Carasouel';
import Banner from '@/components/Banner';
export default function page() {
  return (
    <div className="bg-[#F7E1BC] min-h-screen">
<Navbar />
<Carasouel/>
<Banner/>

    </div>
  )
}
