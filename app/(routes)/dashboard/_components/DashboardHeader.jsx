import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardLayout = () => {
  return (
    <div className='p-5 border-b shadow-sm flex justify-between'>
      <div>
        
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  )
}

export default DashboardLayout