'use client'

import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'


const Dashboard = () => {

  const { user } = useUser();
  return (
    <div className='p-8'>
      <h2 className='font-semibold text-2xl'>Hi, {user?.firstName}</h2>
      <p>Lets Manage your Expenses.</p>
      </div>
  )
}

export default Dashboard