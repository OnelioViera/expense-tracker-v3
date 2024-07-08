'use client'

import React, { use, useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'



const SideNav = () => {
  const path = usePathname()

  useEffect(() => {
    console.log(path)
  }, [path])

  const menuList = [
    {
      id: 1,
      name: 'Dashboard',
      icon: LayoutGrid,
      path: '/dashboard'
    },
    {
      id: 2,
      name: 'Budgets',
      icon: PiggyBank,
      path: '/dashboard/budgets'
    },
    {
      id: 3,
      name: 'Expenses',
      icon: ReceiptText,
      path: '/dashboard/expenses/id'
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: ShieldCheck,
      path: '/dashboard/upgrade'
    }
  ]

  return (

      
      <div className='h-screen p-5 border-r shadow-sm'>
      <Image
        src='/logo-1.svg'
        alt='logo'
        width={70}
        height={70} />
      <div className='mt-5'>
        {menuList.map((menu, index) => (
          <Link href={menu.path}>
            <h2 className={`flex gap-2 item-center text-gray-500 mb-2 font-medium p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100${path === menu.path && 'text-primary bg-blue-100'}`}>
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className='fixed items-center bottom-10 p-5 flex gap-2'>
        <UserButton />
        Profile
      </div>
    </div>
  )
}

export default SideNav