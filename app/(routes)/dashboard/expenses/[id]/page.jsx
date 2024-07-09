'use client'

import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq, desc } from 'drizzle-orm'
import { getTableColumns, sql } from 'drizzle-orm'
import { Expenses } from '@/utils/schema'
import BudgetItem from '../../budgets/_components/BudgetItem'
import EditBudget from '../_components/EditBudget'
import AddExpenses from '../_components/AddExpenses'
import ExpenseListTable from '../_components/ExpenseListTable'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ExpensesScreen = ({ params }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expenseList, setExpenseList] = useState([]);
  const route = useRouter();

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

  // Delete budget
  const deleteBudget = async () => {

    const deleteExpenseResult = await db.delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
    }
    toast('Budget Deleted!', 'success');
    route.replace('/dashboard/budgets');
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses

        <div className='flex items-center gap-2'>

          <EditBudget />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2"
                variant="destructive">
                <Trash />Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your current budget along with expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

      </h2>
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
        <ExpenseListTable expenseList={expenseList} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  )
}

export default ExpensesScreen
