import React from 'react';
import Link from 'next/link';

const BudgetItem = ({ budget }) => {
  if (!budget) {
    return null; // or some fallback UI
  }

  return (
    <Link href={'/dashboard/expenses/' + budget.id} className='p-5 border rounded-lg hover:shadow-md cursor-pointer'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-4 items-center'>
          <h2 className='text-2xl p-3 px-3 bg-slate-100 rounded-full'>{budget.icon || '🗂️'}</h2>
          <div>
            <h2 className='font-semibold text-lg'>{budget.name || 'Unnamed Budget'}</h2>
            <h2 className='text-sm text-gray-500'>{budget.totalItem || 0} Item</h2>
          </div>
        </div>
        <h2 className='font-bold text-primary text-lg'> ${budget.amount || 0}</h2>
      </div>
      <div className='mt-5'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-sm text-slate-500'>${budget.totalSpend ? budget.totalSpend : 0} Spent</h2>
          <h2 className='text-sm text-slate-500'>${budget.amount ? budget.amount - budget.totalSpend : 0} Remaining</h2>
        </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'>
          <div className='w-[40%] bg-primary h-2 rounded-full'></div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;

