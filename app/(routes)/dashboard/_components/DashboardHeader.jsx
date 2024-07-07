'use client'

import React, { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

const DashboardLayout = () => {
  const path = usePathname()
  const [title, setTitle] = useState('Dashboard')
  const [subtitle, setSubtitle] = useState('')

  useEffect(() => {
    switch (path) {
      case '/dashboard':
        setTitle('Dashboard')
        setSubtitle('Take Control of Your Finances')
        break
      case '/dashboard/budgets':
        setTitle('Budgets')
        setSubtitle('Create and Manage Budgets')
        break
      case '/dashboard/expenses':
        setTitle('Expenses')
        setSubtitle('Track Your Expenses')
        break
      case '/dashboard/upgrade':
        setTitle('Upgrade')
        setSubtitle('Coming Soon')
        break
      default:
        setTitle('Dashboard')
        setSubtitle('')
    }
  }, [path])

  return (
    <div className='p-5 border-b shadow-sm flex justify-between items-center'>
      <h1 className='text-2xl'>
        {title} {subtitle && <span className='text-lg ml-4'>{subtitle}</span>}
      </h1>
      <div>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardLayout

