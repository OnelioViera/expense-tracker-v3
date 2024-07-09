'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq, desc } from 'drizzle-orm'
import { getTableColumns, sql } from 'drizzle-orm'
import { Expenses } from '@/utils/schema'
import BudgetItem from '../../budgets/_components/BudgetItem'
import AddExpenses from '../_components/AddExpenses'
import ExpenseListTable from '../_components/ExpenseListTable'



const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  // Get budget info
  const getBudgetInfo = async () => {
    const budgetId = parseInt(params.id, 10);

    if (isNaN(budgetId)) {
      console.error("Invalid budget ID:", params.id);
      return;
    }

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount}::NUMERIC)`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, budgetId))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpenseList();

  }


  // Get expense list
  const getExpenseList = async () => { 
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .orderBy(desc(Expenses.id));
      setExpenseList(result);
    console.log(result);
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>My Expenses</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? <BudgetItem
          budget={budgetInfo}
        /> :
          <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'>
            
          </div>}
        <AddExpenses budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-2xl'>Latest Expenses</h2>
        <ExpenseListTable expenseList={expenseList}  refreshData = {() => getBudgetInfo() } />
      </div>
    </div>
  )
}

export default ExpensesScreen
