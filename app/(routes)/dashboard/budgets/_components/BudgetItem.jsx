import React from 'react'

const BudgetItem = ({ budget }) => {
  return (
    <div className='p-5 border rounded-lg'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-4 items-center'>
          <h2 className='text-2xl p-3 px-3 bg-slate-100 rounded-full'>{budget?.icon}</h2>
          <div>
            <h2 className='font-semibold text-lg'>{budget.name}</h2>
            <h2 className=''>{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className='font-bold text-primary text-lg'> ${budget.amount}</h2>
      </div>
      <div className='mt-5'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-sm text-slate-500'>${budget.totalSpend? budget.totalSpend:0} Spent</h2>
          <h2 className='text-sm text-slate-500'>${budget.amount-budget.totalSpend} Remaining</h2>
        </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'>
        <div className='w-[40%] bg-primary h-2 rounded-full'>
        </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetItem
