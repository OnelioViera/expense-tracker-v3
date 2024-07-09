'use client'

import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo'
import { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { desc, getTableColumns, sql, eq } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'

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

    <CardInfo budgetList = {budgetList} />

      </div>
  )
}

export default Dashboard