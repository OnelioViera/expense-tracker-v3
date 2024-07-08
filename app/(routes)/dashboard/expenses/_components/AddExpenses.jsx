'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const AddExpenses = () => {

  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input placeholder='e.g. Bedroom Decor'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input placeholder='e.g. 1000$'
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button disabled={!(name && amount)} className="mt-3 w-full">Add New Expense</Button>
    </div>
  )
}

export default AddExpenses
