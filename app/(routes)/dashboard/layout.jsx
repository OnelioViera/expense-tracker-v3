import React from 'react'
import SideNav from './_components/SideNav'

const Dashboard = ({children}) => {
  return (
    
    <div>
      <div className='fixed md:w-64 hidden md:block border-r shadow-sm'>
        <SideNav />
      </div>
      <div className='md:ml-64'>
        {children}
        </div>
    </div>
  )
}

export default Dashboard
