import React from 'react'
import CreateBudget from './CreateBudget'
import { db }from '@/utils/dbConfig'
import { getTableColumns, sql } from 'drizzle-orm'
import { Budgets } from '@/utils/schema'

const BudgetList = () => {

  const getBudgetList = async () => {

    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
    })
  }

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      <CreateBudget />
      </div>
    </div>
  )
}

export default BudgetList
