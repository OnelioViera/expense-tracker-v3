"use client"

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/dbConfig'
import { Expenses, Budgets } from '@/utils/schema'
import { toast } from 'sonner'

const AddExpenses = ({ budgetId, user }) => {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const addNewExpense = async () => { 
    const result = await db.insert(Expenses).values({
      name: name,
      amount: amount,
      budgetId: budgetId,
      createdAt: new Date().toISOString()
    }).returning({ insertedId: Budgets.id });

    console.log(result);

    if (result) { 
      toast.success('New Expense Added!');
    }

  }

  return (
    <div className='border p-5 rounded-lg'>
      <h2 className='font-bold text-lg'>Add Expense</h2>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Name</h2>
        <Input 
          placeholder='e.g. Bedroom Decor'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mt-2'>
        <h2 className='text-black font-medium my-1'>Expense Amount</h2>
        <Input 
          placeholder='e.g. 1000$'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button 
        disabled={!(name && amount)}
        onClick={addNewExpense}
        className="mt-3 w-full"
      >
        Add New Expense
      </Button>
    </div>
  )
}

export default AddExpenses

