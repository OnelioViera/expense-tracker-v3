'use client'

import React from 'react'
import { useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, getTableColumns, sql, eq } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseListTable from './expenses/_components/ExpenseListTable'

const Dashboard = () => {

  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      user && getBudgetList();
    }
  }, [user]);

  const getBudgetList = async () => {
  
      const result = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount}::NUMERIC)`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));
      
    setBudgetList(result);
    getAllExpenses();
      
    }

    // Get all expenses that belong to the user
    const getAllExpenses = async () => {
      const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        
      }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));
      setExpensesList(result);
    }

  return (
    <div className='p-8'>
      <h2 className='font-semibold text-2xl'>Hi, {user?.firstName}</h2>
      <p className='text-gray-500'>Lets Manage your Expenses.</p>

      <CardInfo budgetList={budgetList} />

      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard
          budgetList={budgetList}
          />

          <ExpenseListTable
          expensesList={expensesList}
          refreshData={() => getBudgetList()}
          />

        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList?.length > 0 ? budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))
            :
            [1, 2, 3, 4].map((item, index) => (
              <div className='h-[180xp] w-full bg-slate-200 rounded-lg animate-pulse'>
              </div>
            ))

          }

        </div>
      </div>
      </div>
  )
}

export default Dashboard