import { Trash } from 'lucide-react';
import React from 'react';
import { Expenses } from '@/utils/schema';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const formatAmountWithCommas = (amount) => {
  return Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const ExpenseListTable = ({ expenseList, refreshData }) => {

  const deleteExpense = async (expense) => {
    const result = await db.delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    
    if (result) {
      toast.success('Expense Deleted!');
      refreshData();
    }
  }

  return (
    <div className='mt-3'>
      <div className='grid grid-cols-4 bg-slate-200 p-2 border-b-2 border-gray-300'>
        <h2 className='font-semibold'>Name</h2>
        <h2 className='font-semibold'>Amount</h2>
        <h2 className='font-semibold'>Date</h2>
        <h2 className='font-semibold'>Action</h2>
      </div>
      {expenseList.map((expense, index) => (
        <div key={index} className='grid grid-cols-4 bg-slate-50 p-2 gap-4'>
          <h2 className='text-sm text-gray-600'>{expense.name}</h2>
          <h2 className='text-sm text-gray-600'>$ {formatAmountWithCommas(expense.amount)}</h2>
          <h2 className='text-sm text-gray-600'>{expense.createdAt}</h2>
          <h2 className='text-md text-gray-600'>
            <Trash className='text-red-600 cursor-pointer hover:outline hover:rounded-lg'
            onClick={() => deleteExpense(expense)} />
          </h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;


