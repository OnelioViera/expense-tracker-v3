'use client'

import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, getTableColumns, sql, eq } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import BarChartDashboard from './_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'

const Dashboard = () => {

  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);

  useEffect(() => {
    if (user) {
      getBudgetList();
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
        </div>
        <div className='grid gap-3'>
          {budgetList.map((budget, index) => (
            <BudgetItem budget = {budget} key={index} />
          ))}
        </div>
      </div>
      </div>
  )
}

export default Dashboard