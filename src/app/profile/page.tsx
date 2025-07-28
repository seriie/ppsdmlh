"use client"
import React from 'react'
import DesktopSidebar from '@/layout/main/DesktopSidebar'
import { useState } from 'react'


const Page = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <DesktopSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <h1>Profile Page</h1>
    </div>
  )
}


export default Page